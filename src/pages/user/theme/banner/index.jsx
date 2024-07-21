import { memo } from "react";
import "./banner.css";
import to_bottom from './img/to_bottom.png';

const Banner = () => {
    return  (
        <div id="banner">
        <div className="box-left">
            <h2>
                <span>LAPTOP</span>
                <br />
                <span>GAMING</span>

            </h2>
            <p>Khám phá bộ sưu tập laptop gaming đẳng cấp, sức mạnh và hiệu suất tối ưu, 
               mang đến trải nghiệm chơi game hoàn hảo nhất cho bạn</p>
            <button>Khám phá ngay</button>
        </div>
      
        <div className="to-bottom" >
            <a href="">
                <img src={to_bottom} alt="" />
            </a>
        </div>
    </div>
    );
};

export default memo(Banner);
