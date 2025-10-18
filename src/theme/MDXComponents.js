import React from "react";

import MDXComponents from "@theme-original/MDXComponents";
import Title from "@site/src/components/Title";
import Card from "@site/src/components/Card";
import CardLink from "@site/src/components/CardLink";
import ImgCardLink from "@site/src/components/ContentElementeDisplay";
import FontFamily from "@site/src/components/FontFamily";
import FreeImage from "@site/src/components/FreeImage";
import ImgPosition from "@site/src/components/ImgPosition";
import Image from "@site/src/components/Image";
import Markers from "@site/src/components/Markers";
import DownloadBTN from "@site/src/components/DownloadBTN";
import ColorBoxes from "@site/src/components/ColorBoxes";
import MasonryGallery from "@site/src/components/Masonry";
import Reference from "@site/src/components/Reference";



// Native Docusaurus
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NotFound from '@theme/NotFound';

// Semi Native Componenents
import Icon from "@theme/DocItem/Content/EditLink/Icon";



// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default {
    ...MDXComponents,

    // Bootstrap
    Container,
    Row,
    Col,

    // Native Docusaurus
    Tabs,
    TabItem,

    Title,
    Card,
    CardLink,
    ImgCardLink,
    FontFamily,
    FreeImage,
    ImgPosition,
    Image,
    Markers,
    DownloadBTN,
    ColorBoxes,
    MasonryGallery,
    Reference,
	NotFound,
  Icon,
};
