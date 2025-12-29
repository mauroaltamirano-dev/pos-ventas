import Lottie from "lottie-react";

export function LottieAnimation({ h, w, animation }) {
  return (
    <Lottie
      animationData={animation}
      loop={true}
      autoplay={true}
      style={{
        height: `${h}px`,
        width: `${w}px`,
        minHeight: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
