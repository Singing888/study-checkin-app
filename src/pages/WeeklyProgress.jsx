import { useState } from 'react'
import './PlaceholderPage.css'

// 每周进度打卡页（预留）：支持图片上传预览
function WeeklyProgress() {
  const [images, setImages] = useState([])
  const [note, setNote] = useState('')

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...previews])
  }

  const handleRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('周进度已提交（演示）！接入后端后可真正保存。')
  }

  return (
    <div className="placeholder-page">
      <div className="page-intro">
        <h2>每周进度打卡</h2>
        <p>上传本周学习进度截图，记录你的坚持与成长。</p>
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
          <span className="upload-icon">📷</span>
          <span>点击选择图片（可多选）</span>
          <span className="upload-hint">支持 JPG、PNG 等常见格式</span>
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
          本周小结（选填）
          <textarea
            className="form-textarea"
            placeholder="例如：完成了高数第三章，英语背了 200 个单词……"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
          />
        </label>

        <button type="submit" className="submit-btn">
          提交本周进度
        </button>
      </form>

      <p className="dev-note">
        💡 当前为前端演示，刷新页面后图片不会保留。后续可对接云存储（如腾讯云 COS）。
      </p>
    </div>
  )
}

export default WeeklyProgress
