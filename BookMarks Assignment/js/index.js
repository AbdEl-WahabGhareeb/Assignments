var bookName = document.getElementById("bookmarkName");
var bookURL = document.getElementById("bookmarkURL");

var allBookMarks = [];

if (localStorage.getItem("all") != null) {
    allBookMarks = JSON.parse(localStorage.getItem("all"));
    showBookmarks();
}

bookName.addEventListener("input", function () {
    validBookmarkName();
});

bookURL.addEventListener("input", function () {
    validSiteURL();
});

function clearInpts() {
    bookName.value = "";
    bookURL.value = "";
    bookName.classList.remove("is-valid", "is-invalid");
    bookURL.classList.remove("is-valid", "is-invalid");
}

// =============== validation =============== //

function isDuplicatedName() {
    for (var i = 0; i < allBookMarks.length; i++) {
        if (
            allBookMarks[i].Name.toLowerCase() === bookName.value.toLowerCase()
        ) {
            return true; // Duplicate name found
        }
    }
    return false; // No duplicates
}

function validSiteURL() {
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (regex.test(bookURL.value)) {
        bookURL.classList.remove("is-invalid");
        bookURL.classList.add("is-valid");
        return true;
    }
    bookURL.classList.remove("is-valid");
    bookURL.classList.add("is-invalid");
    return false;
}

function validBookmarkName() {
    var regex = /^\w{3,}(\s+\w+)*$/;
    if (regex.test(bookName.value)) {
        bookName.classList.remove("is-invalid");
        bookName.classList.add("is-valid");
        return true;
    }
    bookName.classList.remove("is-valid");
    bookName.classList.add("is-invalid");
    return false;
}

// C ====> Create

function addBookmark() {
    if (validSiteURL() && validBookmarkName() && isDuplicatedName() === false) {
        var bookMark = {
            Name: bookName.value,
            Link: bookURL.value,
        };
        allBookMarks.push(bookMark);
        localStorage.setItem("all", JSON.stringify(allBookMarks));
        showBookmarks();
        clearInpts();
    } else {
        document
            .getElementById("dialogBox")
            .classList.replace("d-none", "d-block");
    }
}

// R ====> Read

function showBookmarks() {
    var bookmarksList = "";
    for (var i = 0; i < allBookMarks.length; i++) {
        bookmarksList += `<tr>
                        <td class="align-middle">${i + 1}</td>
                        <td class="align-middle">${allBookMarks[i].Name}</td>
                        <td class="align-middle"><a class="btn btn-success" href="${
                            allBookMarks[i].Link
                        }">  <i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                        <td class="align-middle"><button class="btn btn-danger" onclick="deleteBookmark(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
                    </tr>`;
    }
    document.getElementById("tBody").innerHTML = bookmarksList;
}

// D ====> Delete

function deleteBookmark(index) {
    allBookMarks.splice(index, 1);
    localStorage.setItem("all", JSON.stringify(allBookMarks));
    showBookmarks();
}

function closeDialog() {
    document.getElementById("dialogBox").classList.replace("d-block", "d-none");
}
