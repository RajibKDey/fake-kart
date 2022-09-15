import { Backdrop, CircularProgress } from "@mui/material";

interface BackdropOverlayProps {
  open: boolean;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  backdropSx?: any;
  circularProgressSx?: any;
}

const sx = {
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
  circularProgress: {},
};

function BackdropOverlay(props: BackdropOverlayProps) {
  return (
    <Backdrop sx={{ ...sx.backdrop, ...props.backdropSx }} open={props.open}>
      <CircularProgress
        sx={{ ...sx.circularProgress, ...props.circularProgressSx }}
        color={props.color}
      />
    </Backdrop>
  );
}

export default BackdropOverlay;
