import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  CardTitle
} from 'reactstrap';

class CampsiteInfo extends React.Component {
  render() {
    const { campsite } = this.props;
    if (campsite) {
      return (
        <div className="row">
          {this.renderCampsite(campsite)}
          {this.renderComments(campsite.comments)}
        </div>
      );
    }
    return '';
  }

  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle><h5>{campsite.name}</h5></CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }

  renderComments(comments) {
    if (comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map((comment, index) => {
            return (
              <div key="index">
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
}

export default CampsiteInfo;
