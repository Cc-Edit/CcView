type FileIconProps = {
  type?: string,
  className: string,
  size: number
}
export default function FileIcon({ type, size = 32, className }: FileIconProps) {
  switch (type) {
    case 'json':
      return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path d='M12.823 15.122c-.517 0-.816.491-.816 1.146c0 .661.311 1.126.82 1.126c.517 0 .812-.49.812-1.146c0-.604-.291-1.126-.816-1.126z' fill='currentColor'/><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296c-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06c.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211c.35 0 .534-.146.534-.365c0-.211-.159-.331-.564-.476c-.562-.195-.927-.506-.927-.996c0-.576.481-1.017 1.277-1.017c.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476c.596.22.876.53.876 1.006c.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716c0-1.012.646-1.768 1.642-1.768c1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z' fill='currentColor'/></svg>;
    case 'gif':
      return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-2.667 15.772A4.512 4.512 0 0 1 9.984 18c-.737 0-1.271-.186-1.644-.546c-.371-.348-.575-.875-.569-1.469c.006-1.344.983-2.111 2.309-2.111c.521 0 .924.103 1.121.198l-.191.731c-.222-.096-.498-.174-.941-.174c-.762 0-1.338.432-1.338 1.308c0 .833.522 1.325 1.271 1.325c.21 0 .378-.024.45-.061v-.846h-.624v-.713h1.505v2.13zm1.634.186h-.918v-4.042h.918v4.042zm3.262-3.292h-1.553v.923h1.451v.744h-1.451v1.625h-.918v-4.042h2.471v.75zM14 9h-1V4l5 5h-4z' fill='currentColor'/></svg>;
    case 'image':
      return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path d='M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18l5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5l1.597 1.363L13 13l4 6H7l2-3z' fill='currentColor'/></svg>;
    case 'html':
      return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.531 18h-.76v-1.411H6.515V18h-.767v-3.373h.767v1.296h1.257v-1.296h.76V18zm3-2.732h-.921V18h-.766v-2.732h-.905v-.641h2.592v.641zM14.818 18l-.05-1.291c-.017-.405-.03-.896-.03-1.387h-.016c-.104.431-.245.911-.375 1.307l-.41 1.316h-.597l-.359-1.307a15.154 15.154 0 0 1-.306-1.316h-.011c-.021.456-.034.976-.059 1.396L12.545 18h-.705l.216-3.373h1.015l.331 1.126c.104.391.21.811.284 1.206h.017c.095-.391.209-.836.32-1.211l.359-1.121h.996L15.563 18h-.745zm3.434 0h-2.108v-3.373h.767v2.732h1.342V18z' fill='currentColor'/></svg>;
    default:
      return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path d='M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4zM7 8h3v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z' fill='currentColor'/></svg>;
  }
}

