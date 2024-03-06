import $ from "jquery";
import { SelectBox } from "../Select/SelectBox";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import * as auth from "../../apis/auth";
import * as Swal from "../../apis/alert";
import "./RecBoardCp.css";

const RecBoardCp = () => {

    const {isLogin, userInfo} = useContext(LoginContext);
    const [showImgs, setShowImgs] = useState([]);
    const [showImgInd, setShowImgInd] = useState(0);
    const [picImgInd, setPicImgInd] = useState(0);
    const [showBoardNum, setShowBoardNum] = useState(0);
    const [showBoardLike, setShowBoardLike] = useState(0);
    const [page, setPage] = useState(0);

    // 글 자세히 보기 ---------------------------------
    const showBoard = async (num) => { // 글 눌렀을 때 실행되는 함수
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const login = localStorage.getItem("isLogin");
        console.log(user);
        console.log(login);
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
                    $(".rboard_show_like").attr("disabled", true);
                    break ;
                }
            }
            if (response.data.userNo != user.no) {
                $(".rboard_show_modi").css("display", "none");
                $(".rboard_show_delete").css("display", "none");
            }
        }
        if (response.status != 200 || resImgs.status != 200) {
            Swal.alert("게시물 로드 실패 !", "게시물을 불러오는데 실패했습니다.", "error");
            closeShow();
            return ;
        }
        if (resImgs.data.length > 0) {
            setShowImgs(resImgs.data);
            $(".rboard_show_top img").attr("src", `/images/${resImgs.data[showImgInd].boardSaveImageName}.${resImgs.data[showImgInd].boardSaveImageExt}`);
        }
        setShowBoardLike(response.data.boardLike);
        console.log(response);
        console.log(resImgs);
        
        $(".rboard_show_t").val(response.data.boardTitle);
        $(".rboard_show_d").val(response.data.boardDesc);
        $(".rboard_show_like").text(`❤️ ${response.data.boardLike}`);

        $(".rboard_container").css("opacity", "0.4"); // 배경 흐릿하게
        $(".rboard_container").css("pointer-events", "none"); // 다시 auto 로 바꾸면 동작
        $(".rboard_show_page").css("top", `${(($(window).height()-$(".rboard_show_page").outerHeight())/2+$(window).scrollTop())}px`); // 중앙 정렬
        $(".rboard_show_page").css("left", `${(($(window).width()-$(".rboard_show_page").outerWidth())/2+$(window).scrollLeft())}px`); // 중앙 정렬
        $(".rboard_show_page").css("display", "flex").hide().fadeIn(500); // 글 화면 띄우기
        $(".rboard_show_page").css("opacity", "1"); // 글 화면 흐릿한 효과 제거
        $(".rboard_show_page").css("pointer-events", "auto"); // 글 화면 포인터 on
        $("body").css("overflow", "hidden"); // 스크롤 방지
    }
    const closeShow = () => { // 글 자세히 보기 창 닫기
        setShowImgs([]);
        setShowImgInd(0);
        $(".rboard_show_t").attr("readonly", true);
        $(".rboard_show_d").attr("readonly", true);
        $(".rboard_show_modi_submit").css("display", "none");
        $(".rboard_show_modi_cancle").css("display", "none");
        $(".rboard_show_top img").attr("src", `/images/default.jpg`);
        $(".rboard_show_like").attr("disabled", false);
        $(".rboard_container").css("opacity", "1"); // 배경 흐릿한 효과 제거
        $(".rboard_container").css("pointer-events", "auto"); // 화면 포인터 on
        $(".rboard_show_page").css("display", "none"); // 글 작성 화면 삭제
        $("body").css("overflow", ""); // 스크롤 방지 해제
    }
    const showBoardNextImg = () => { // 글 자세히 보기 다음 이미지
        $(".rboard_show_top img").attr("src", `/images/${showImgs[showImgInd+1].boardSaveImageName}.${showImgs[showImgInd+1].boardSaveImageExt}`);
        setShowImgInd(showImgInd+1);
    }
    const showBoardPrevImg = () => { // 글 자세히 보기 이전 이미지
        $(".rboard_show_top img").attr("src", `/images/${showImgs[showImgInd-1].boardSaveImageName}.${showImgs[showImgInd-1].boardSaveImageExt}`);
        setShowImgInd(showImgInd-1);
    }
    const likeUp = () => { // 좋아요 버튼 클릭
        const response = auth.boardLike(showBoardNum, userInfo.no);
        console.log(response);
        $(".rboard_show_like").text(`❤️ ${showBoardLike + 1}`);
        $(".rboard_show_like").attr("disabled", true);
    }
    // 글 자세히 보기 ---------------------------------//

    // 사진 미리보기 ---------------------------------
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [imageNum , setImageNum] = useState(0);
    const [itemNum, setItemNum] = useState(0);
        
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
        setPicImgInd(imageNum -1);
        let fileRead = new FileReader();
        fileRead.onload = function(){
            setPreviewImg(fileRead.result);
        };
        
        fileRead.readAsDataURL(postImg[imageNum -1]);
        setImageNum(imageNum -1);
    }
    const nextImage = () => {
        setPicImgInd(imageNum +1);
        let fileRead = new FileReader();
        fileRead.onload = function(){
            setPreviewImg(fileRead.result);
        };
        
        fileRead.readAsDataURL(postImg[imageNum +1]);
        setImageNum(imageNum +1);
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
        $("#sido1").find('option:first').prop('selected', true);
        $(".write_gugun option").remove();
        $(".write_gugun").append("<option value=''>구/군 선택</option>");
        setPostImg([]);
        setPreviewImg([]);
        setImageNum(0);
    }
    // 글 작성 창 열기 / 닫기 -------------------------------//

    // 글 등록 ---------------------------------
    const write_new_board = async () => { // 글 작성 요청 함수
        let response = null;
        const data = {
            "userNo": userInfo.no,
            "boardTitle": $("#rboard_write_t").val(),
            "boardDesc": $("#rboard_write_d").val(),
            "boardLoc1": $("#sido1").val(),
            "boardLoc2": $(".write_gugun").val(),
        }
        try {
            response = await auth.boardWrite(data);
            const statusUpload = response.status;
            const boardNo = response.data; // 이미지 등록 실패시 게시물 삭제 요청
            console.log(statusUpload);
            if (statusUpload == 200 && postImg.length > 0) { // 글 등록 성공시 이미지 등록 요청
                console.log("이미지 업로드 요청 !!");
                console.log(`postImg.length ===> ${postImg.length}`);
                const formData = new FormData();
                for (let i = 0; i < postImg.length; i++) {
                    formData.append("file", postImg[i]);
                }
                formData.append("boardNo", boardNo);
                formData.append("logoInd", picImgInd);
                response = await auth.boardImgWrite(formData);
                const statusImgUpload = response.status;
                closeWrite();
                if (statusImgUpload == 200) {
                    Swal.alert("글 작성 성공!", "글 작성에 성공했습니다.", "success");
                    window.location.reload();
                    return ;
                } else {
                    const response = await auth.boardDelete(boardNo);
                    if (response.status == 200) {
                        Swal.alert("글 작성 오류!", "이미지 업로드 과정에서 오류가 발생했습니다.", "error");
                        return ;
                    } else {
                        Swal.alert("글 작성 오류!", "게시글 등록은 성공했으나 이미지 등록에 실패했습니다.", "error");
                        return ;
                    }
                }
            }
            Swal.alert("글 작성 성공!", "글 작성에 성공했습니다.", "success");
        } catch {
            Swal.alert("글 작성 실패!", "다시 시도해주세요.", "error");
            return ;
        }
    }
    // 글 등록 ---------------------------------//

    // 더보기 버튼 클릭 시 ---------------------------------
    const addItem = () => {
        setPage(page+1);
    }
    // 더보기 버튼 클릭 시 ---------------------------------//

    // 검색 기능 ---------------------------------------------
    const [searchPage, setSearchPage] = useState(0);
    const [searchTitle, setSearchTitle] = useState("null");
    const [searchName, setSearchName] = useState("null");
    const [searchLoc1, setSearchLoc1] = useState("null");
    const [searchLoc2, setSearchLoc2] = useState("null");
    const [searchItemNum, setSearchItemNum] = useState(0);
    const [searchType, setSearchType] = useState(false);
    const search = async () => {
        if ($("#rboard_search_val").val().length == 0 && $("#rboard_search_name").val().length == 0 && $("#sido2").val() == "시/도 선택" && $("#rboard_search_val").val().length == 0) {
            setSearchPage(0)
            setSearchType(false);
            setSearchTitle("null");
            setSearchName("null");
            setSearchLoc1("null");
            setSearchLoc2("null");
            window.location.reload();
            return ;
        }
        let title = $("#rboard_search_val").val();
        let name = $("#rboard_search_name").val();
        let loc1 = $("#sido2").val();
        let loc2 = $("#gugun2").val();
        if ($("#rboard_search_val").val().length == 0) title = null;
        if ($("#rboard_search_name").val().length == 0) name = null;
        if ($("#sido2").val() == "시/도 선택") loc1 = null;
        if ($("#gugun2").val().length == 0 || $("#gugun2").val() == "구/군 선택") loc2 = null;
        setSearchTitle(title);
        setSearchName(name);
        setSearchLoc1(loc1);
        setSearchLoc2(loc2);
        const data = {
            title: title,
            name: name,
            loc1: loc1,
            loc2: loc2,
        }
        try {
            const response = await auth.getBoardSearch(0, data);
            console.log(response);
            setSearchType(true);
            $(".rboard_list_item").remove();
            for (let i = searchItemNum; i < searchItemNum+2; i++) {
                $(".rboard_item_plus_bnt").before(
                    `<div class="rboard_list_item" id="rboard_list_item${i}"></div>`
                );
            }
            if (response.data.length < 4) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
                for (let i = 3; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            }
            setSearchItemNum(searchItemNum + 2);
        } catch {
            Swal.alert("에러 발생 !", "게시물을 불러오는 중 에러가 발생했습니다.", "error");
            return ;
        }
    }
    const searchPlus = async () => {
        const data = {
            title: searchTitle,
            name: searchName,
            loc1: searchLoc1,
            loc2: searchLoc2,
        }
        try {
            const response = await auth.getBoardSearch(searchPage+1, data);
            console.log(response);
            for (let i = searchItemNum; i < searchItemNum+2; i++) {
                $(".rboard_item_plus_bnt").before(
                    `<div class="rboard_list_item" id="rboard_list_item${i}"></div>`
                );
            }
            if (response.data.length < 4) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
                for (let i = 3; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${searchItemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${searchItemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            }
        } catch {
            Swal.alert("에러 발생 !", "게시물을 불러오는 중 에러가 발생했습니다.", "error");
            return ;
        }
    }
    // 검색 기능 ---------------------------------------------//

    // 글 수정 기능 ---------------------------------------------
    const [originBoardTitle, setOriginBoardTitle] = useState("");
    const [originBoardDesc, setOriginBoardDesc] = useState("");
    const onModifyButton = () => {
        setOriginBoardTitle($(".rboard_show_t").val());
        setOriginBoardDesc($(".rboard_show_d").val());
        $(".rboard_show_modi_submit").css("display", "block");
        $(".rboard_show_modi_cancle").css("display", "block");
        $(".rboard_show_t").attr("readonly", false);
        $(".rboard_show_d").attr("readonly", false);
    }
    const modifyBoard = async () => {
        const data = {
            boardNo: showBoardNum,
            boardTitle: $(".rboard_show_t").val(),
            boardDesc: $(".rboard_show_d").val(),
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
        $(".rboard_show_t").attr("readonly", true);
        $(".rboard_show_d").attr("readonly", true);
        $(".rboard_show_t").val(originBoardTitle);
        $(".rboard_show_d").val(originBoardDesc);
        $(".rboard_show_modi_submit").css("display", "none");
        $(".rboard_show_modi_cancle").css("display", "none");
    }
    // 글 수정 기능 ---------------------------------------------//

    // 글 삭제 기능 ---------------------------------------------
    const deleteBoard = async () => {
        try {
            Swal.confirm(`로그아웃 하시겠습니까?`, `로그아웃을 진행합니다.`, `warning`, async (result) => {
                if (result.isConfirmed) {
                    const response = await auth.boardDelete(showBoardNum);
                    if (response.status == 200) {
                        window.location.reload();
                        Swal.alert("글 삭제 성공 !", "글 삭제를 성공했습니다 !", "success");
                        return ;
                    } else {
                        window.location.reload();
                        Swal.alert("글 삭제 실패 !", "글 삭제를 실패했습니다 !", "error");
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
    // 글 삭제 기능 ---------------------------------------------//

    useEffect(() => {
        SelectBox();
        $(".rboard_container").css("display", "flex").hide().fadeIn(500);
    }, [])

    useEffect(() => {
        const requestList = async () => {
            const response = await auth.getBoard(page);
            console.log(response);
            if (response.data.length > 0) {
                $(".rboard_list").css("height", `${$(".rboard_list").height() + 620}`);
            }
            for (let i = itemNum; i < itemNum+2; i++) {
                $(".rboard_item_plus_bnt").before(
                    `<div class="rboard_list_item" id="rboard_list_item${i}"></div>`
                );
            }
            if (response.data.length < 4) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${itemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${itemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${itemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${itemNum}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
                for (let i = 3; i < response.data.length; i++) {
                    if (response.data[i].boardSaveImageName === "" && response.data[i].boardSaveImageExt === "" || response.data[i].boardSaveImageName == null && response.data[i].boardSaveImageExt === null) {
                        $(`#rboard_list_item${itemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/default.jpg" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    } else {
                        $(`#rboard_list_item${itemNum+1}`).append(
                            `<div class="rboard_item" id="${response.data[i].boardNo}">
                                <img src="/images/${response.data[i].boardSaveImageName}.${response.data[i].boardSaveImageExt}" />
                                <h2>${response.data[i].boardTitle}</h2>
                            </div>`
                        )
                    }
                    $(`#${response.data[i].boardNo}`).click(() => {
                        showBoard(response.data[i].boardNo);
                    });
                }
            }
            setItemNum(itemNum+2);
        } 
        requestList();
    }, [page])

    return (
        <>
            <div className="rboard_show_page">
                <div className="rboard_show_top">
                    <img src="/images/default.jpg" />
                    <button className="rboard_show_close" onClick={() => {closeShow()}}>X</button>
                    <button className="rboard_show_nextImg" disabled={showImgs.length == 0 || showImgInd == showImgs.length-1} onClick={showBoardNextImg}>{">"}</button>
                    <button className="rboard_show_prevImg" disabled={showImgInd == 0} onClick={showBoardPrevImg}>{"<"}</button>
                </div>
                <div className="rboard_show_title">
                    <input type="text" className="rboard_show_t" readOnly />
                </div>
                <div className="rboard_show_desc">
                    <textarea className="rboard_show_d" id="rboard_show_d" readOnly></textarea>
                </div>
                {
                    isLogin &&
                    <div className="rboard_show_buts">
                        <button className="rboard_show_like" onClick={likeUp}>❤️</button>
                        <button className="rboard_show_modi" onClick={onModifyButton}>수정</button>
                        <button className="rboard_show_delete" onClick={deleteBoard}>삭제</button>
                        <button className="rboard_show_modi_submit" onClick={modifyBoard}>완료</button>
                        <button className="rboard_show_modi_cancle" onClick={cancleModify}>취소</button>
                    </div>
                }
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
                    <select name="sido1" id="sido1"></select>
                    <select name="gugun1" id="gugun1" className="write_gugun"></select>
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
                    <input type="button" value="글 작성" onClick={() => {write_new_board()}} />
                    <input type="button" value="대표이미지" onClick={ () => {
                        setPicImgInd(imageNum);
                        Swal.alert("대표이미지 설정 완료 !", "현재 미리보기 이미지를 대표 이미지로 설정했습니다.", "success");
                    }} />
                </div>
            </div>
            <div className="rboard_container">
                <div className="rboard_list">
                    {
                        searchType ?
                        <div className="rboard_item_plus_bnt">
                            <button onClick={() => {searchPlus()}}>더보기</button>
                        </div>
                        :
                        <div className="rboard_item_plus_bnt">
                            <button onClick={() => {addItem()}}>더보기</button>
                        </div>
                    }
                </div>
                <div className="rboard_menu">
                    <div className="rboard_menu_title">
                        <input type="text" className="rboard_menu_input" id="rboard_search_val" placeholder="검색어를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_writer">
                        <input type="text" className="rboard_menu_input" id="rboard_search_name" placeholder="작성자를 입력해주세요." />
                    </div>
                    <div className="rboard_menu_loc">
                        <select name="sido1" id="sido2"></select>
                        <select name="gugun1" id="gugun2" className="menu_gugun"></select>
                        <input type="button" className="rboard_menu_search" value="검색" onClick={() => {search()}} />
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