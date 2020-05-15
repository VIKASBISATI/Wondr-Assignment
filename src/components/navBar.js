import React  from "react";
//Mui
import AppBar from "@material-ui/core/AppBar";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function NavBar(props) {
  const [checked, setChecked] = React.useState(false);
  const toggleChecked = (event) => {
    setChecked(prev => !prev);
    console.log("event", event.target.checked)
    props.checkedStatus(event.target.checked);
  };
    return (
      <div>
        <AppBar position="fixed" style={{display:"flex", justifyContent:"spaceAround"}}>
          <div className="header">
           <h2> Image Gallery </h2>
            <FormControlLabel
          control={<Switch checked={checked} onChange={toggleChecked} />}
          label="Toggle images color"
          labelPlacement="start"

        />
          </div>
        </AppBar>
      </div>
    );
  }