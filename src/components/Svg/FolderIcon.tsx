type FolderProps = {
  className: string,
  size: number
}

export default function EyesIcon({ size = 32, className }: FolderProps) {
    return <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} viewBox='0 0 24 24'><path fill='currentColor' d='M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8H6q-.825 0-1.413.588T4 10v8l1.975-6.575q.2-.65.738-1.038T7.9 10h12.9q1.025 0 1.613.813t.312 1.762l-1.8 6q-.2.65-.738 1.038T19 20H4Z'/></svg>;
}