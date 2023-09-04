type LoadingIconProp = {
  width?: number,
  className?: string,
  size?: number
}

export default function LoadingIcon({ className, size = 24, width = 4 }: LoadingIconProp) {
  return (
    <svg className={`animate-spin h-5 w-5 ${className}`} style={{}} xmlns='http://www.w3.org/2000/svg' fill='none'
         viewBox={`0 0 ${size} ${size}`}>
      <circle className='opacity-25' cx={size / 2} cy={size / 2} r={size / 2 - width / 2} stroke='currentColor'
              strokeWidth={width}></circle>
      <path className='opacity-75' fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
    </svg>
  );
}
