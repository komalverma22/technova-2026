import FloatingLines from "./bg";


<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FloatingLines
    enabledWaves={["top","middle","bottom"]}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={5}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={5}
    bendRadius={5}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
</div>