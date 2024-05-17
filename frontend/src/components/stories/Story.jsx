import Stories from "../../FackApis/StoriesData";
import UserStory from "./UserStory";
import "./story.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Story() {
  return (
    <div className="stories">
      <UserStory />

      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
        {Stories.map((story) => (
          <SwiperSlide>
            <div className="story" key={story.id}>
              <div className="user">
                <img src={story.storyProfile} alt={story.name} />
              </div>
              <img src={story.story} alt={story.story} />
              <h5>{story.name}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Story;
