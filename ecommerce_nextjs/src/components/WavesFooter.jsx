'use client'

export default function WavesFooter() {
  return (
    <div>
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 690"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
      >
        {/* Definisi Gradien - Hanya 1 kali */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#F78DA7"></stop>
            <stop offset="95%" stopColor="#8ED1FC"></stop>
          </linearGradient>
        </defs>

        {/* Lapisan 1 */}
        <path
          d="M 0,700 L 0,356 C 51.8,383.3 103.7,410.7 157,391 C 210.2,371.2 264.9,304.4 335,255 C 405.0,205.5 490.5,173.5 557,173 C 623.4,172.4 670.7,203.2 727,192 C 783.2,180.7 848.4,127.3 903,99 C 957.5,70.6 1001.3,67.2 1063,30 C 1124.6,-7.2 1204.1,-78.2 1270,-117 C 1335.8,-155.7 1387.9,-162.3 1440,-169 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.4"
          className="transition-all duration-300 ease-in-out delay-150"
        ></path>

        {/* Lapisan 2 */}
        <path
          d="M 0,700 L 0,531 C 64.2,525.1 128.5,519.3 191,516 C 253.4,512.6 314.1,511.8 373,500 C 431.8,488.1 488.7,465.1 548,412 C 607.2,358.8 668.8,275.3 733,242 C 797.1,208.6 863.8,225.3 926,209 C 988.1,192.6 1045.8,143.2 1093,131 C 1140.1,118.7 1176.9,143.6 1233,129 C 1289.0,114.3 1364.5,60.1 1440,6 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150"
        ></path>

        {/* Lapisan 3 */}
        <path
          d="M 0,700 L 0,706 C 80.6,704.1 161.3,702.3 210,701 C 258.6,699.6 275.1,698.7 328,682 C 380.8,665.2 470.1,632.4 538,609 C 605.8,585.5 652.1,571.2 701,528 C 749.8,484.7 801.1,412.4 875,368 C 948.8,323.5 1045.1,307.0 1108,286 C 1170.8,264.9 1200.2,239.2 1250,221 C 1299.7,202.7 1369.8,191.8 1440,181 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150"
        ></path>
      </svg>
    </div>
  );
}
