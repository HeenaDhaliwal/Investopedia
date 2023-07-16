// onload profile page email automatically fill whose id is active
function doOnLoad()
{
    var active=localStorage.getItem("activeUser");
    alert(active);
    document.querySelector("#txtEmail").value=active;
    document.querySelector("#txtEmail").ReadOnly=true;

}
/*preview image*/
const previewImage = (event) => {
    const imageFiles = event.target.files;
    const imageFilesLength = imageFiles.length;
    if (imageFilesLength > 0) {
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        const imagePreviewElement = document.querySelector("#preview-img");
        imagePreviewElement.src = imageSrc;
        imagePreviewElement.style.display = "block";
    }
};

function fileValidation() {
    var fileInput = document.getElementById('file');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    }
}

function doCart(list) {
    var index=list.selectedIndex;
    document.querySelector('#txtSel').value += list[index].text + ';';
}
// Jquery
$(document).ready(function () {
    //Pitcher btn search
    $("#SharkSearch").click(function () {
        // alert("hello");
        var email = $("#txtEmail").val();
        var obj = {
            type: "get",
            url: "/json-shark-search",
            data: {
                emaill: email
            }
        }
        $.ajax(obj).done(function (respJsonAry) {
            alert(JSON.stringify(respJsonAry));

            if (respJsonAry.length == 0) {
                alert("Invalid Data");
            }
            else {
                $("#txtName").val(respJsonAry[0].name); //use table col name
                $("#txtLname").val(respJsonAry[0].lname); //use table col name
                $("#txtDate").val(respJsonAry[0].dob); //use table col name
                alert(respJsonAry[0].dob);

                $("#txtAdd").val(respJsonAry[0].address); //use table col name
                $("#txtMob").val(respJsonAry[0].contact); //use table col name
                $("#txtCity").val(respJsonAry[0].city); //use table col name
                $("#txtState").val(respJsonAry[0].state); //use table col name
                $("#txtZip").val(respJsonAry[0].zip); //use table col name
                alert(respJsonAry[0].ppic);

                $("#hdn").val(respJsonAry[0].ppic);
                $("#preview-img").prop("src", "uploads/" + respJsonAry[0].ppic); // use table col name

                $("#txtCompany").val(respJsonAry[0].company); //use table col name
                $("#txtPro").val(respJsonAry[0].profession); //use table col name
                $("#txtEstd").val(respJsonAry[0].estd); //use table col name
                $("#txtInv").val(respJsonAry[0].noofinv); //use table col name
                $("#txtComp").val(respJsonAry[0].incomp); //use table col name
                $("#txtField").val(respJsonAry[0].domain); //use table col name
                $("#txtSel").val(respJsonAry[0].selfeild); //use table col name
                $("#txtOther").val(respJsonAry[0].other); //use table col name  
            }
        }).fail(function (msg) {
            alert(msg.toString());
        });
    });



    //   Email validation
    $("#txtEmail").blur(function () {
        var email = $("#txtEmail").val();
        var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (exp.test(email) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   Name validation
    $("#txtName").blur(function () {
        var name = $("#txtName").val();
        var exp = /^[a-zA-Z ]{2,30}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    // Last  Name validation
    $("#txtLname").blur(function () {
        var lname = $("#txtLname").val();
        var exp = /^[a-zA-Z ]{2,30}$/;

        if (exp.test(lname) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    // date validation
    // $("#txtDate").blur(function () {
    //     var add = $("#txtDate").val();
    //     var exp = /^(d{1,2})(/|-)(d{1,2})(/|-)(d{4})$/;

    //     if (exp.test(add) == true) {
    //         $(this).css("border", "2px solid green");
    //         $(this).removeClass("is-invalid");
    //     } else {
    //         $(this).css("border", "2px solid red");
    //         $(this).addClass("is-invalid");
    //     }
    // });


    // Address validation
    $("#txtAdd").blur(function () {
        var add = $("#txtAdd").val();
        var exp = /^[a-zA-Z 0-9 ().,/-]{2,150}$/;

        if (exp.test(add) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   contact no validation
    $("#txtMob").blur(function () {
        var mob = $("#txtMob").val();
        var r = /^[6-9]{1}[0-9]{9}$/;
        if (r.test(mob) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        }
        else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   City validation
    $("#txtCity").blur(function () {
        var name = $("#txtCity").val();
        var exp = /^[a-zA-Z]{2,30}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   State validation
    $("#txtState").blur(function () {
        var sel = $("#txtState").val();

        if (sel == 'Select') {
            $(this).css("border", "2px solid red");
        } else {
            $(this).css("border", "2px solid green");
        }
    });

    //   Zip validation
    $("#txtZip").blur(function () {
        var name = $("#txtZip").val();
        var exp = /^(\d{4}|\d{6})$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   Company Name/URL validation
    $("#txtCompany").blur(function () {
        var name = $("#txtCompany").val();
        var exp = /^[a-zA-Z ]{2,30}$/;
        var expp = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

        if (exp.test(name) == true || expp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   Profession validation
    $("#txtPro").blur(function () {
        var name = $("#txtPro").val();
        var exp = /^[a-zA-Z & () ,]{2,60}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });


    //   Estd. validation
    $("#txtEstd").blur(function () {
        var name = $("#txtEstd").val();
        var exp = /^19[0-9]\d|20[0-2]\d/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   No of Investements validation
    $("#txtInv").blur(function () {
        var name = $("#txtInv").val();
        var exp = /^[0-9]{0,3}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   In Companies validation
    $("#txtComp").blur(function () {
        var name = $("#txtComp").val();
        var exp = /^[a-zA-Z,/ .()]{2,150}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //   Domain/Fields validation
    $("#txtField").blur(function () {
        var sel = $("#txtField").val();

        if (sel == 'Select') {
            $(this).css("border", "2px solid red");
        } else {
            $(this).css("border", "2px solid green");
        }
    });

    //   Selected Field validation
    $("#txtSel").blur(function () {
        var name = $("#txtSel").val();
        var exp = /^[a-zA-Z,;()/ &]{2,150}$/;

        if (exp.test(name) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    //  Other details validation
    $("#txtOther").blur(function () {
        var pro = $("#txtOther").val();
        var exp = /^[a-zA-Z 0-9 ().,/-]{2,150}$/;

        if (exp.test(pro) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });
});