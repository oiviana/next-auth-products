"use client"
import { useState } from "react"
import { api } from "@/services/api"

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo CSV.")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const { data } = await api.post("/upload/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setMessage(`✅ Upload feito com sucesso! Job ID: ${data.jobId}`)
    } catch (error: any) {
      console.error(error)
      setMessage(error.response?.data?.error || "❌ Erro ao enviar arquivo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Enviando..." : "Enviar CSV"}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
