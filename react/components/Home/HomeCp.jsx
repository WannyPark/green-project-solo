import "./HomeCp.css";

const HomeCp = () => {

    return (
        <>
            <div className="home_content">
                <div className="home_title">
                    <h1>실시간 전국 맛집추천 게시글 TOP5</h1>
                </div>
                <div className="home_desc">
                    <div className="home_desc_item">
                        <img src="/images/default.jpg" />
                        <div className="home_item_title">아이템1</div>
                    </div>
                    <div className="home_desc_item">
                        <img src="/images/default.jpg" />
                        <div className="home_item_title">아이템2</div>
                    </div>
                    <div className="home_desc_item">
                        <img src="/images/default.jpg" />
                        <div className="home_item_title">아이템3</div>
                    </div>
                    <div className="home_desc_item">
                        <img src="/images/default.jpg" />
                        <div className="home_item_title">아이템4</div>
                    </div>
                    <div className="home_desc_item">
                        <img src="/images/default.jpg" />
                        <div className="home_item_title">아이템5</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomeCp;