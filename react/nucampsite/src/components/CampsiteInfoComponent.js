import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite(props) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={props.campsite.image} alt={props.campsite.name} />
        <CardBody>
          <CardText>{props.campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments(props) {
  if (props.comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {props.comments.map((comment, index) => {
          return (
            <div key={index}>
              <p>{comment.text}</p>
              <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return '';
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
        <div className="container">
          <div className="row">
              <div className="col">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{ props.campsite.name }</BreadcrumbItem>
                </Breadcrumb>
                <h2>{ props.campsite.name }</h2>
                <hr/>
              </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
