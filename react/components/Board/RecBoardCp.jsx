import $ from "jquery";
import { SelectBox } from "../Select/SelectBox";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "./RecBoardCp.css";

const RecBoardCp = () => {

    const {isLogin} = useContext(LoginContext)

    const addItem = () => {
        const height = $(".rboard_list").height();
        $(".rboard_list").css("height", height + 300);
        $(".rboard_item_plus_bnt").before(
            `<div class="rboard_list_item">
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 7</h2>
                </div>
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 8</h2>
                </div>
                <div class="rboard_item">
                    <img src="/images/default.jpg" />
                    <h2>맛집 9</h2>
                </div>
            </div>`
        );
        $(".rboard_item").click(() => {showBoard()});
    };

    const showBoard = () => { // 글 눌렀을 때 실행되는 함수
        $(".rboard_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".rboard_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".rboard_show_page").css("top", `${(($(window).height()-$(".rboard_show_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".rboard_show_page").css("left", `${(($(window).width()-$(".rboard_show_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".rboard_show_page").css("display", "flex").hide().fadeIn(500); // 글 화면 띄우기
        $(".rboard_show_page").css("opacity", "1"); // 글 화면 흐릿한 효과 제거
        $(".rboard_show_page").css("pointer-events", "auto"); // 글 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeShow = () => {
        $(".rboard_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".rboard_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".rboard_show_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
    }

    // 사진 미리보기 ---------------------------------
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [imageNum , setImageNum] = useState(0);
        
    const uploadFile = (e) => {
        if (e.target.files.length == 0) {
            setPostImg([]);
            setPreviewImg([]);
            setImageNum(0);
            return ;
        }
        setImageNum(0);
        let fileArr = e.target.files;
        setPostImg(Array.from(fileArr));

        let fileRead = new FileReader();
        fileRead.onload = () => {
            setPreviewImg(fileRead.result);
        };
        
        fileRead.readAsDataURL(fileArr[0]);
    };
    const prevImage = () => {
        let fileRead = new FileReader();
        fileRead.onload = function(){
            setPreviewImg(fileRead.result);
        };

        fileRead.readAsDataURL(postImg[imageNum - 1]);
        setImageNum(imageNum - 1);
    }
    const nextImage = () => {
        let fileRead = new FileReader();
        fileRead.onload = function(){
            setPreviewImg(fileRead.result);
        };

        fileRead.readAsDataURL(postImg[imageNum + 1]);
        setImageNum(imageNum + 1);
    }
    // 사진 미리보기 -------------------------------//

    // 글 작성 창 열기 / 닫기 ---------------------------------
    const showWrite = () => { // 글 작성 눌렀을 때 실행되는 함수
        $(".rboard_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".rboard_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".rboard_write_page").css("top", `${(($(window).height()-$(".rboard_write_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".rboard_write_page").css("left", `${(($(window).width()-$(".rboard_write_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".rboard_write_page").css("display", "flex").hide().fadeIn(500); // 글 작성 화면 띄우기
        $(".rboard_write_page").css("opacity", "1"); // 글 작성 화면은 흐릿한 효과 제거
        $(".rboard_write_page").css("pointer-events", "auto"); // 글 작성 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeWrite = () => {
        $(".rboard_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".rboard_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".rboard_write_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
        $("#rboard_write_t").val("");
        $("#rboard_write_d").val("");
        setPostImg([]);
        setPreviewImg([]);
        setImageNum(0);
    }
    // 글 작성 창 열기 / 닫기 -------------------------------//

    useEffect(() => {
        SelectBox();
        $(".rboard_container").css("display", "flex").hide().fadeIn(500);
    }, []);

    return (
        <>
            <div className="rboard_show_page">
                <div className="rboard_show_top">
                    <img src="/images/default.jpg" />
                    <button className="rboard_show_close" onClick={() => {closeShow()}}>X</button>
                </div>
            </div>
            <div className="rboard_write_page">
                <div className="rboard_write_top">
                    <button className="rboard_write_close" onClick={() => {closeWrite()}}>X</button>
                </div>
                <div className="rboard_write_title">
                    <input type="text" id="rboard_write_t" className="rboard_write_t" placeholder="제목을 입력해주세요." />
                </div>
                <div className="rboard_write_desc">
                    <textarea className="rboard_write_d" id="rboard_write_d" cols="480px" rows="10" placeholder="내용을 입력해주세요."></textarea>
                </div>
                <div className="rboard_write_file">
                    <label htmlFor="uploadFile" className="rboard_write_upload_button">사진 등록</label>
                    <input type="file" id="uploadFile" accept="image/*" multiple onChange={uploadFile} />
                </div>
                <div className="rboard_write_show_pics">
                    <button onClick={prevImage} disabled={!imageNum} className="rboard_write_pics_button">이전</button>
                    {
                        postImg.length > 0 ?
                        <img src={previewImg} /> :
                        <span>이미지를 업로드 해주세요.</span>
                    }
                    <button onClick={nextImage} disabled={postImg.length == 0 || postImg.length-1 == imageNum} className="rboard_write_pics_button">다음</button>
                </div>
                <div className="rboard_write_button">
                    <input type="button" value="글 작성" />
                </div>
            </div>
            <div className="rboard_container">
                <div className="rboard_list">
                    <div className="rboard_list_item">
                        <div className="rboard_item" id="1" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 1</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 2</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 3</h2>
                        </div>
                    </div>
                    <div className="rboard_list_item">
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 4</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 5</h2>
                        </div>
                        <div className="rboard_item" onClick={() => {showBoard()}}>
                            <img src="/images/default.jpg" />
                            <h2>맛집 6</h2>
                        </div>
                    </div>
                    <div className="rboard_item_plus_bnt">
                        <button onClick={() => {addItem()}}>더보기</button>
                    </div>
                </div>
                <div className="rboard_menu">
                    <div className="rboard_menu_title">
                        <input type="text" className="rboard_menu_input" placeholder="검색어를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_writer">
                        <input type="text" className="rboard_menu_input" placeholder="작성자를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_loc">
                        <select name="sido1" id="sido1"></select>
                        <select name="gugun1" id="gugun1"></select>
                        <input type="button" className="rboard_menu_search" value="검색" />
                    </div>
                    {
                        isLogin &&
                        <div className="rboard_list_add_button">
                            <button onClick={() => {showWrite()}}>글 작성</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )

}

export default RecBoardCp;