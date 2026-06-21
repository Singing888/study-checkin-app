import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './PlaceholderPage.css'

const USER_NAME_KEY = 'study_checkin_user_name'
const STORAGE_BUCKET = 'weekly-progress'

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-')
}

// 每周专业课进度打卡页：支持图片上传预览，并提交到 Supabase
function WeeklyProgress() {
  const [images, setImages] = useState([])
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...previews])
  }

  const handleRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userName = localStorage.getItem(USER_NAME_KEY)

    if (!userName) {
      alert('请先回到首页输入姓名，再提交周进度')
      return
    }

    if (images.length === 0) {
      alert('请至少上传一张专业课思维导图或分级大纲图片')
      return
    }

    setSubmitting(true)
    setMessage('')

    const uploadedImages = []

    for (const image of images) {
      const filePath = `${userName}/${Date.now()}-${safeFileName(image.name)}`
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, image.file)

      if (uploadError) {
        console.error('上传周进度图片失败：', uploadError)
        setMessage('提交失败：请检查 Supabase Storage 是否已创建 weekly-progress 存储桶。')
        setSubmitting(false)
        return
      }

      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath)

      uploadedImages.push({
        path: filePath,
        url: data.publicUrl,
      })
    }

    const { error } = await supabase
      .from('weekly_progress')
      .insert([
        {
          user_id: userName,
          note: note.trim(),
          images: uploadedImages,
        },
      ])

    if (error) {
      console.error('保存周进度记录失败：', error)
      setMessage('图片已上传，但进度记录保存失败：请检查 weekly_progress 表是否已创建。')
      setSubmitting(false)
      return
    }

    setImages([])
    setNote('')
    setMessage('周进度已提交，管理者可在后台查看。')
    setSubmitting(false)
  }

  return (
    <div className="placeholder-page">
      <div className="page-intro">
        <h2>专业课周进度</h2>
        <p>上传本周专业课背诵成果，建议使用一页纸思维导图或分级大纲。</p>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label className="upload-zone">
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <span className="upload-icon">📄</span>
          <span>上传专业课思维导图 / 分级大纲</span>
          <span className="upload-hint">建议拍清楚整张纸，支持 JPG、PNG，可多选</span>
        </label>

        {images.length > 0 && (
          <div className="preview-grid">
            {images.map((img) => (
              <div key={img.id} className="preview-item">
                <img src={img.url} alt={img.name} />
                <button
                  type="button"
                  className="preview-remove"
                  onClick={() => handleRemove(img.id)}
                  aria-label="删除"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="form-label">
          本周专业课小结（选填）
          <textarea
            className="form-textarea"
            placeholder="例如：本周完成第 1 章框架背诵，仍需复盘概念之间的关系。"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
        </label>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? '提交中...' : '提交周进度'}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>

      <p className="dev-note">
        说明：提交后图片会上传到 Supabase Storage，并在 weekly_progress 表中保存记录。
      </p>
    </div>
  )
}

export default WeeklyProgress
