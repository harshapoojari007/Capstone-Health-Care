import Carousel from 'react-bootstrap/Carousel';
import "./carousal.css"

function Carousal() {
  return (
    <Carousel slide={false}>
      <Carousel.Item className='carousal_img'>
      <img  src="https://muffingroup.com/blog/wp-content/uploads/2022/05/uhc-1.jpg" alt="" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousal_img'>
        <img className='carousal_img' src="https://muffingroup.com/blog/wp-content/uploads/2022/05/uhc-1.jpg" alt="" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
      <img className='carousal_img' src="https://muffingroup.com/blog/wp-content/uploads/2022/05/uhc-1.jpg" alt="" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousal;