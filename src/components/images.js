import React, { Component } from "react";
import { connect } from "react-redux";
import { getImages } from "../redux/actions/imageActions";
import Navbar from "./navBar";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import {
  CircularProgress,
  DialogContent,
  Menu,
  MenuItem,
  Input
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import CustomDialog from "./customDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = () => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 150
  }
});

class Images extends Component {
  cardRef;
  intersectionObserver;
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();

    this.state = {
      imagesList: [],
      pageNum: 1,
      loaded: true,
      greyScale: false,
      openDialog: false,
      imageIndex: null,
      detailedViewGreyScale: false,
      anchorEl: null,
      width: "",
      height: "",
      chgDimension: false,
      blurFactor: "",
      modifiedUrl: ""
    };
  }
  componentDidMount() {
    this.props.getImages(this.state.pageNum);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      imagesList: nextProps.images
    });
  }
  handleImageLoad = () => {
    this.setState({
      loaded: false
    });
  };
  toggleChecked = event => {
    this.setState({
      detailedViewGreyScale: event.target.checked
    });
    console.log("event", event.target.checked);
    // props.checkedStatus(event.target.checked);
  };
  fetchImages = () => {
    const updatedPageNum = this.state.pageNum + 1;
    this.setState({
      pageNum: updatedPageNum
    });
    this.props.getImages(updatedPageNum);
  };
  checkedStatus = isGreyScale => {
    this.setState({
      greyScale: isGreyScale
    });
  };
  openDialog = i => {
    this.setState({
      openDialog: true,
      imageIndex: i
    });
  };
  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };
  handleInputRange = () => {};
  handleCloseMenuItems = e => {
    this.setState({
      anchorEl: null,
      blurFactor: e.target.textContent
    });
  };
  setBlurLevel = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  handleDimensionChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: [value]
    });
  };
  changeDimensions = () => {
    let modifiedUrl = this.state.imagesList[
      this.state.imageIndex
    ].download_url.split("/");
    modifiedUrl[5] = this.state.width;
    modifiedUrl[6] = this.state.height;
    modifiedUrl = modifiedUrl.join("/");
    console.log("modie", modifiedUrl);
    this.setState({
      chgDimension: true,
      modifiedUrl
    });
  };
  render() {
    const ITEM_HEIGHT = 28;

    return (
      <>
        <Navbar checkedStatus={this.checkedStatus} />
        <div>
          <InfiniteScroll
            dataLength={this.state.imagesList.length}
            next={this.fetchImages}
            className="custom-grid"
            hasMore={true}
            loader={<CircularProgress />}
          >
            {this.state.imagesList &&
              this.state.imagesList.map((imageInfo, index) => {
                return (
                  <>
                    <div key={index}>
                      <img
                        className="card-image"
                        src={
                          this.state.greyScale
                            ? imageInfo.download_url + "?grayscale"
                            : imageInfo.download_url
                        }
                        alt="lorem-picsum"
                        onLoad={this.handleImageLoad}
                        // height={250}
                        // width={200}
                        onClick={() => this.openDialog(index)}
                      />
                      <div className="card-details">
                        <h3>{imageInfo.author}</h3>
                        <span className="image-id">#{imageInfo.id}</span>
                      </div>
                    </div>
                  </>
                );
              })}
          </InfiniteScroll>
          {this.state.openDialog && (
            <CustomDialog
              open={this.state.openDialog}
              onClose={this.handleClose}
              title="Detail Image View"
            >
              <DialogContent>
                <div>
                  <div>
                    <img
                      // className="card-image"
                      src={
                        this.state.greyScale || this.state.detailedViewGreyScale
                          ? this.state.imagesList[this.state.imageIndex]
                              .download_url + "?grayscale"
                          : this.state.blurFactor
                          ? this.state.imagesList[this.state.imageIndex]
                              .download_url + `?blur=${this.state.blurFactor}`
                          : this.state.chgDimension
                          ? this.state.modifiedUrl
                          : this.state.imagesList[this.state.imageIndex]
                              .download_url
                      }
                      alt="lorem-picsum"
                      height={150}
                      width={250}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.detailedViewGreyScale}
                          onChange={this.toggleChecked}
                        />
                      }
                      label="Toggle images color"
                      labelPlacement="start"
                    />
                  </div>
                  <div className="dialog-dimension-input">
                    <Input
                      onChange={this.handleDimensionChange}
                      name="width"
                      value={this.state.width}
                      placeholder="Width"
                      inputProps={{ "aria-label": "description" }}
                    />
                    <Input
                      onChange={this.handleDimensionChange}
                      name="height"
                      value={this.state.height}
                      placeholder="Height"
                      inputProps={{ "aria-label": "description" }}
                    />
                    <Button onClick={this.changeDimensions} color="primary">
                      Change Dimensions
                    </Button>
                  </div>
                  <div>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={this.setBlurLevel}
                    >
                      {this.state.blurFactor
                        ? `You have selected ${this.state.blurFactor} Blur factor`
                        : "Open Menu"}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch"
                        }
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((items, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={this.handleCloseMenuItems}
                          >
                            {items}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <a
                  href={this.state.imagesList[this.state.imageIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </CustomDialog>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  images: state.imageReducer.images,
  loader: state.uiReducer.loading
});
export default connect(mapStateToProps, { getImages })(
  withStyles(styles)(Images)
);
