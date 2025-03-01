export default function WavesKecil() {
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
          <defs>
            {/* Gradient untuk warna background wave */}
            <linearGradient id="waveGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#F78DA7"></stop>
              <stop offset="95%" stopColor="#8ED1FC"></stop>
            </linearGradient>
          </defs>
  
          {/* Wave 1 */}
          <path
            d="M 0,700 L 0,175 C 112.95693779904306,205.87081339712918 225.91387559808612,236.74162679425837 311,247
              C 396.0861244019139,257.25837320574163 453.3014354066986,246.9043062200957 538,247
              C 622.6985645933014,247.0956937799043 734.8803827751195,257.64114832535887 849,304
              C 963.1196172248805,350.35885167464113 1079.177033492823,432.5311004784689 1178,467
              C 1276.822966507177,501.4688995215311 1358.4114832535884,488.23444976076553 1440,475
              L 1440,700 L 0,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#waveGradient)"
            fillOpacity="0.53"
            className="transition-all duration-300 ease-in-out delay-150"
          ></path>
  
          {/* Wave 2 */}
          <path
            d="M 0,700 L 0,408 C 74.25837320574166,409.4736842105263 148.51674641148333,410.9473684210526 250,424
              C 351.4832535885167,437.0526315789474 480.1913875598085,461.6842105263158 574,475
              C 667.8086124401915,488.3157894736842 726.7177033492825,490.31578947368416 811,529
              C 895.2822966507175,567.6842105263158 1004.9377990430621,643.0526315789474 1114,679
              C 1223.0622009569379,714.9473684210526 1331.531100478469,711.4736842105262 1440,708
              L 1440,700 L 0,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#waveGradient)"
            fillOpacity="1"
            className="transition-all duration-300 ease-in-out delay-150"
          ></path>
        </svg>
      </div>
    );
  }
  