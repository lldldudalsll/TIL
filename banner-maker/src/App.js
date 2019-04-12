import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SizeForm from "./components/SizeForm";
import Palette from "./components/Palette";
import Preview from "./components/Preview";
import Input from "./components/Input";
import Editor from "./components/Editor";
import Footer from "./components/Footer";

import { COLOR_TYPE } from "./common/Constant";


class App extends Component {

  state = {
    colorType: COLOR_TYPE.BACKGROUND,
    width: "700",
    height: "300",
    text: "Sample Text",
    backgroundColor: '#ccc',
    fontColor: "white",
    href: "",
    fontFamily: "SF Pro",
    fontFamilyList: ["SF Pro", "Times New Roman", "Helvetica", "Courier"],
    fontSizeList: [20, 30, 40, 50, 60, 70, 80, 90, 100, 120],
    fontSize: "40",
    lineHeight: 1.4
  }

  render() {

    const {
      colorType,
      backgroundColor,
      fontColor,
      text,
      href,
      fontSize,
      fontFamily,
      fontFamilyList,
      fontSizeList,
      lineHeight,
      width,
      height
    } = this.state;

    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
