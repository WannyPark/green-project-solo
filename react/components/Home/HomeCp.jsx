import { useEffect, useState } from "react";
import * as auth from "../../apis/auth";
import $ from "jquery";
import * as Swal from "../../apis/alert";
import "./HomeCp.css";

const HomeCp = () => {

    const [isLogin, setLogin] = useState(false);
    const [showImgs, setShowImgs] = useState([]);
    const [showImgInd, setShowImgInd] = useState(0);
    const [showBoardNum, setShowBoardNum] = useState(0);
    const [showBoardLike, setShowBoardLike] = useState(0);
    const [originBoardTitle, setOriginBoardTitle] = useState("");
    const [originBoardDesc, setOriginBoardDesc] = useState("");

    const showBoard = async (num) => { // 글 눌렀을 때 실행되는 함수
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const login = localStorage.getItem("isLogin");
        setShowBoardNum(num);
        const response = await auth.boardInfo(num);
        const resImgs = await auth.boardImages(num);
        let likeBoards;
        if (login) {
            console.log("좋아요 가져오기!!");
            likeBoards = await auth.userLikeBoards(user.no);
            console.log(likeBoards);
            for (let i = 0; i < likeBoards.data.length; i++) {
                if (likeBoards.data[i].boardNo == num) {
                    $(".home_show_like").attr("disabled", true);
                    break ;
                }
            }
            if (response.data.userNo != user.no) {
                $(".home_show_modi").css("display", "none");
                $(".home_show_delete").css("display", "none");
            }
        }
        if (response.status != 200 || resImgs.status != 200) {
            Swal.alert("게시물 로드 실패 !", "게시물을 불러오는데 실패했습니다.", "error");
            closeShow();
            return ;
        }
        if (resImgs.data.length > 0) {
            setShowImgs(resImgs.data);
            $(".home_show_top img").attr("src", `/images/${resImgs.data[showImgInd].boardSaveImageName}.${resImgs.data[showImgInd].boardSaveImageExt}`);
        }
        setShowBoardLike(response.data.boardLike);
        
        $(".home_show_t").val(response.data.boardTitle);
        $(".home_show_d").val(response.data.boardDesc);
        $(".home_show_like").text(`❤️ ${response.data.boardLike}`);

        $(".home_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".home_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".home_show_page").css("top", `${(($(window).height()-$(".home_show_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".home_show_page").css("left", `${(($(window).width()-$(".home_show_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".home_show_page").css("display", "flex").hide().fadeIn(500); // 글 화면 띄우기
        $(".home_show_page").css("opacity", "1"); // 글 화면 흐릿한 효과 제거
        $(".home_show_page").css("pointer-events", "auto"); // 글 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeShow = () => { // 글 자세히 보기 창 닫기
        setShowImgs([]);
        setShowImgInd(0);
        $(".home_show_t").attr("readonly", true);
        $(".home_show_d").attr("readonly", true);
        $(".home_show_modi_submit").css("display", "none");
        $(".home_show_modi_cancle").css("display", "none");
        $(".home_show_top img").attr("src", `/images/default.jpg`);
        $(".home_show_like").attr("disabled", false);
        $(".home_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".home_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".home_show_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
    }
    const showBoardNextImg = () => { // 글 자세히 보기 다음 이미지
        $(".home_show_top img").attr("src", `/images/${showImgs[showImgInd+1].boardSaveImageName}.${showImgs[showImgInd+1].boardSaveImageExt}`);
        setShowImgInd(showImgInd+1);
    }
    const showBoardPrevImg = () => { // 글 자세히 보기 이전 이미지
        $(".home_show_top img").attr("src", `/images/${showImgs[showImgInd-1].boardSaveImageName}.${showImgs[showImgInd-1].boardSaveImageExt}`);
        setShowImgInd(showImgInd-1);
    }
    const likeUp = () => { // 좋아요 버튼 클릭
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const response = auth.boardLike(showBoardNum, user.no);
        console.log(response);
        $(".home_show_like").text(`❤️ ${showBoardLike + 1}`);
        $(".home_show_like").attr("disabled", true);
    }

    const onModifyButton = () => {
        setOriginBoardTitle($(".home_show_t").val());
        setOriginBoardDesc($(".home_show_d").val());
        $(".home_show_modi_submit").css("display", "block");
        $(".home_show_modi_cancle").css("display", "block");
        $(".home_show_t").attr("readonly", false);
        $(".home_show_d").attr("readonly", false);
    }
    const modifyBoard = async () => {
        const data = {
            boardNo: showBoardNum,
            boardTitle: $(".home_show_t").val(),
            boardDesc: $(".home_show_d").val(),
        }
        try {
            const response = await auth.boardModify(data);
            if (response.status == 200) {
                Swal.alert("글 수정 성공 !", "글 수정을 성공했습니다 !", "success");
                closeShow();
                showBoard(showBoardNum);
                return ;
            } else {
                Swal.alert("글 수정 실패 !", "글 수정을 실패했습니다 !", "error");
                closeShow();
                showBoard(showBoardNum);
                return ;
            }
        } catch (error) {
            Swal.alert("글 수정 실패 !", "글 수정을 실패했습니다 !", "error");
            closeShow();
            showBoard(showBoardNum);
            return ;
        }
    }
    const cancleModify = () => {
        $(".home_show_t").attr("readonly", true);
        $(".home_show_d").attr("readonly", true);
        $(".home_show_t").val(originBoardTitle);
        $(".home_show_d").val(originBoardDesc);
        $(".home_show_modi_submit").css("display", "none");
        $(".home_show_modi_cancle").css("display", "none");
    }

    const deleteBoard = async () => {
        try {
            Swal.confirm(`글을 삭제 하시겠습니까?`, `글 삭제를 진행합니다.`, `warning`, async (result) => {
                if (result.isConfirmed) {
                    const response = await auth.boardDelete(showBoardNum);
                    if (response.status == 200) {
                        Swal.alert("글 삭제 성공 !", "글 삭제를 성공했습니다 !", "success");
                        window.location.reload();
                        return ;
                    } else {
                        Swal.alert("글 삭제 실패 !", "글 삭제를 실패했습니다 !", "error");
                        window.location.reload();
                        return ;
                    }
                }
            })
        } catch (error) {
            window.location.reload();
            Swal.alert("글 삭제 실패 !", "글 삭제를 실패했습니다 !", "error");
            return ;
        }
    }

    useEffect(() => {
        setLogin(localStorage.getItem("isLogin"));
        $(".home_content").css("display", "flex").hide().fadeIn(500);
        const getBoardAllLoc = async () => {
            const response = await auth.homeBoardAllLoc();
            console.log(response);
            if (response.status == 200) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName == null || response.data[i].boardSaveImageName == "") {
                        $(".home_desc").append(
                            `<div class="home_desc_item" id="home_desc_item${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <div class="home_item_title">${response.data[i].boardTitle}</div>
                            </div>`
                        )
                    } else {
                        $(".home_desc").append(
                            `<div class="home_desc_item" id="home_desc_item${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <div class="home_item_title">${response.data[i].boardTitle}</div>
                            </div>`
                        )
                    }
                    $(`#home_desc_item${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            }
        }
        getBoardAllLoc();
    }, [])

    return (
        <>
            <div className="home_content">
                <div className="home_title">
                    <h1>실시간 전국 맛집추천 게시글 TOP5</h1>
                </div>
                <div className="home_show_page">
                    <div className="home_show_top">
                        <img src="/images/default.jpg" />
                        <button className="home_show_close" onClick={() => {closeShow()}}>X</button>
                        <button className="home_show_nextImg" disabled={showImgs.length == 0 || showImgInd == showImgs.length-1} onClick={showBoardNextImg}>{">"}</button>
                        <button className="home_show_prevImg" disabled={showImgInd == 0} onClick={showBoardPrevImg}>{"<"}</button>
                    </div>
                    <div className="home_show_title">
                        <input type="text" className="home_show_t" readOnly />
                    </div>
                    <div className="home_show_desc">
                        <textarea className="home_show_d" id="home_show_d" readOnly></textarea>
                    </div>
                    {
                        isLogin &&
                        <div className="home_show_buts">
                            <button className="home_show_like" onClick={likeUp}>❤️</button>
                            <button className="home_show_modi" onClick={onModifyButton}>수정</button>
                            <button className="home_show_delete" onClick={deleteBoard}>삭제</button>
                            <button className="home_show_modi_submit" onClick={modifyBoard}>완료</button>
                            <button className="home_show_modi_cancle" onClick={cancleModify}>취소</button>
                        </div>
                    }
                </div>
                <div className="home_desc">
                    
                </div>
            </div>
        </>
    )

}

export default HomeCp;