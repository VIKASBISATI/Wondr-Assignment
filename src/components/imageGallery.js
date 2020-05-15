import React, { Component } from "react";
import { connect } from "react-redux";
import { getImages } from "../redux/actions/imageActions";
//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import { CircularProgress } from "@material-ui/core";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 150
  }
});

class ImageGallery extends Component {
  cardRef;
  intersectionObserver;
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();

    this.state = {
      imagesList: [],
      pageNum: 1,
      loaded: true
    };
    this.intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const updatedPageNum = this.state.pageNum + 1;
        this.setState({
          pageNum: updatedPageNum
        });
        this.props.getImages(updatedPageNum);
      }
    });
  }
  componentDidMount() {
    this.props.getImages(this.state.pageNum);
  }
  componentDidUpdate() {
    if (this.cardRef.current) {
      this.intersectionObserver.observe(this.cardRef.current);
    }
  }
  componentWillUnmount() {
    this.intersectionObserver.disconnect();
  }
  componentWillReceiveProps(nextProps) {
    const length = this.state.imageList || 0;
    const lengthMatch = nextProps.imageList&& nextProps.imageList.length;
      if(length!==lengthMatch){
    this.setState({
      imagesList: nextProps.images
    });
    this.intersectionObserver.disconnect();

}
    this.intersectionObserver.disconnect();
  }
  handleImageLoad = () => {
    this.setState({
      loaded: false
    });
  };
  render() {
    return (
      <div className="image-gallery-container">
        <div className="custom-grid">
          {this.state.imagesList &&
            this.state.imagesList.map((imageInfo, index) => {
              if (this.state.imagesList.length === index + 1) {
                return (
                  <div key={index} className="custom-card">
                    <img
                            className="card-image"
                            src={imageInfo.download_url}
                            alt="lorem-picsum"
                            onLoad={this.handleImageLoad}
                          />
                    <div ref={this.cardRef} className="card-details">
                      <h3>{imageInfo.author}</h3>
                      <span className="image-id">#{imageInfo.id}</span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="custom-card">
                    <img
                            className="card-image"
                            src={imageInfo.download_url}
                            alt="lorem-picsum"
                            onLoad={this.handleImageLoad}
                          />
                    <div className="card-details">
                      <h3>{imageInfo.author}</h3>
                      <span className="image-id">#{imageInfo.id}</span>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        {this.props.loader && <CircularProgress />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  images: state.imageReducer.images,
  loader: state.uiReducer.loading
});
export default connect(mapStateToProps, { getImages })(
  withStyles(styles)(ImageGallery)
);
