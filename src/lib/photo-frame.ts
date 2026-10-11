export type PhotoFrame = {
  // Clockwise document corners in percentages of the source image.
  corners: readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]]
  aspectRatio: number
}

// Map four photographed page corners to a flat rectangle. The source pixels
// are displayed through a CSS projective transform; the source file is unchanged.
export function photoFrameMatrix(frame: PhotoFrame, width: number, height: number) {
  const target = [[0, 0], [width, 0], [width, height], [0, height]]
  const rows = frame.corners.flatMap(([percentX, percentY], index) => {
    const x = percentX * width / 100
    const y = percentY * height / 100
    const [u, v] = target[index]
    return [
      [x, y, 1, 0, 0, 0, -u * x, -u * y, u],
      [0, 0, 0, x, y, 1, -v * x, -v * y, v],
    ]
  })
  // Solve the eight independent coefficients of the homography with pivoting.
  for (let column = 0; column < 8; column++) {
    let pivot = column
    for (let row = column + 1; row < 8; row++) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row
    }
    if (Math.abs(rows[pivot][column]) < 1e-10) return undefined
    ;[rows[column], rows[pivot]] = [rows[pivot], rows[column]]
    const divisor = rows[column][column]
    rows[column] = rows[column].map(value => value / divisor)
    for (let row = 0; row < 8; row++) {
      if (row === column) continue
      const multiplier = rows[row][column]
      rows[row] = rows[row].map((value, index) => value - multiplier * rows[column][index])
    }
  }
  const [a, b, c, d, e, f, g, h] = rows.map(row => row[8])
  return `matrix3d(${[a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1].join(',')})`
}
