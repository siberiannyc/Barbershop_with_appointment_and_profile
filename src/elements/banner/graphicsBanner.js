import React from "react";
import { Box } from "@mui/material";
import BoxesStyles from "../../styles/styleBoxes";

export default function GraphicsBanner({
  bgColor,
  boxColor,
  box1W,
  box1H,
  box2W,
  content1,
  content2,
  content3,
  content4,
  img,
  open,
  caseToOpen,
  variant,
  openTime,
}) {
  const boxes = BoxesStyles();
  return (
    <Box
      className={boxes.graphicsBanner}
      sx={{
        borderRadius: 0,
        bgcolor: bgColor,
        border: 1,
        width: "100%",
      }}
    >
      <Box className={boxes.row} sx={{ justifyContent: "space-between" }}>
        {variant === "left" ? (
          <>
            <Box
              sx={{
                p: 2,
                bgcolor: boxColor,
                minHeight: "60vh",
                width: box1W,
                height: box1H,
                alignItems: "center",
              }}
              className={boxes.columnAdjust}
            >
              {content1}
              {content2}
            </Box>
            <Box
              className={boxes.rowRaw}
              sx={{
                width: box2W,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {caseToOpen !== "datePicker" ? (
                <img
                  src={img}
                  alt="SVG"
                  style={{
                    height: "400px",
                    width: "600px",
                  }}
                  sx={{ mr: 5 }}
                />
              ) : open || openTime ? null : (
                <Box
                  className={boxes.columnAdjust}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "60vh",
                    color: "accentSecondary.main",
                  }}
                >
                  <img
                    src={img}
                    alt="SVG"
                    style={{
                      height: "400px",
                      width: "600px",
                    }}
                    sx={{ mr: 5 }}
                  />
                  {content4}
                </Box>
              )}

              {caseToOpen !== "datePicker"
                ? content3
                : open || openTime
                ? content3
                : null}
            </Box>
          </>
        ) : (
          <>
            <Box
              className={boxes.columnAdjust}
              sx={{
                width: box2W,
                height: "80vh",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src={img}
                alt="SVG"
                style={{
                  height: "400px",
                  width: "600px",
                }}
                sx={{ mr: 5 }}
              />
              {content3}
            </Box>
            <Box
              className={boxes.columnAdjust}
              sx={{
                p: 2,
                pl: 4,
                bgcolor: boxColor,
                width: box1W,
                height: box1H,
                justifyContent: "space-between",
              }}
            >
              {content1}
              {content2}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
