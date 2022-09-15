import { Alert, Snackbar, AlertColor } from "@mui/material";

interface AlertProps {
    open: boolean;
    duration?: number;
    close: () => void;
    message: string;
    status: AlertColor;
}

function AlertNotify(props: AlertProps) {
    return (
        <Snackbar open={props.open} autoHideDuration={props.duration || 2000} onClose={props.close}>
            <Alert onClose={props.close} severity={props.status}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default AlertNotify;