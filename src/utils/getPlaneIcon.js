export const getPlaneIcon = (rotation) =>
  L.divIcon({
    html: `
      <img
        src="${planeIconURL}"
        style="width:20px;height:20px;transform: rotate(${rotation}deg);"
      />
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
