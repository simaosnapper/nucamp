import React from 'react';
import {
  Button,
  Card,
  CardText,
  CardBody,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({comments, postComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
                  <p>{comment.text}</p>
                  <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
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
                <RenderComments 
                  comments={props.comments}
                  postComment={props.postComment}
                  campsiteId={props.campsite.id}
                />
            </div>
        </div>
    );
  }
  return <div />;
}

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isModalOpen: false
    }
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

  handleSubmit = values => {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          Submit Comment &nbsp; <i className="fa fa-pencil" />
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control" defaultValue="1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Rating</Label>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Rating</Label>
                  <Control.textarea model=".text" id="text" name="text"
                    placeholder="Comment" rows="6"
                    className="form-control"
                    validators={{}} />
                  {/* <Errors
                    className="text-danger"
                    model=".firstName"
                    show="touched"
                    component="div"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  /> */}
              </div>
              <Button type="submit" value="submit">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CampsiteInfo;
