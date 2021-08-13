import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        let { memes } = response.data;
        this.setState({
          allMemeImgs: memes,
        });
      });
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  generateImage(e) {
    e.preventDefault();
    let imageIndex = Math.floor(Math.random() * (100 - 0)) + 0;
    let newImage = this.state.allMemeImgs[imageIndex].url;
    this.setState({
      randomImg: newImage,
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <button onClick={this.generateImage}>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="generated meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
