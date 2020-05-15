import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog(props) {

    const { open, title, children, actions, onClose, fullScreen, bodyStyle, contentStyle,  actionStyle } = props;
    const useStyles = makeStyles({
        root: {
            padding: 20,
        },
        paperFullScreen: {
            borderRadius: 6,
        },
        paper: {
            overflow: 'visible'
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'left',
            color: '#16325c',
            width: '100%',
            padding: '10px 20px',
            lineHeight: '32px',
        },
        dividers: {
            borderTop: 'solid 1px #ebebeb',
            borderBottom: 'solid 1px #ebebeb',
        },
        body: {
            fontSize: '13px',
            fontFamily: 'Poppins, sans-serif',
            color: '#16325c',
            padding: '22px',
            wordBreak: 'break-word',
            minWidth: 500,
            ...bodyStyle,
            ...contentStyle,
        }
    });

    const classes = useStyles();
    return (
        <Dialog
            classes={{
                root: classes.root,
                paperFullScreen: classes.paperFullScreen,
                paper: classes.paper,
            }}
            TransitionComponent={Transition}
            keepMounted
            open={open}
            onClose={onClose}
            scroll='paper'
            maxWidth={false}
            fullScreen={fullScreen}
        >
            <DialogTitle classes={{ root: classes.title }} disableTypography id="title">{title}</DialogTitle>
            <DialogContent classes={{
                root: classes.body,
                dividers: classes.dividers
            }} dividers>
                {children}
            </DialogContent>
            {actions.length > 0 && <DialogActions style={actionStyle}>{actions}</DialogActions>}
        </Dialog>
    );
}

CustomDialog.propTypes = {
    open: PropTypes.bool,
    fullScreen: PropTypes.bool,
    title: PropTypes.string,
    actions: PropTypes.array,
    bodyStyle: PropTypes.object,
    actionStyle: PropTypes.object,
    onClose: PropTypes.func,
};

CustomDialog.defaultProps = {
    open: false,
    fullScreen: false,
    title: '',
    children: {},
    actions: [],
    bodyStyle: {},
    actionStyle: {},
    onClose: () => { },
};