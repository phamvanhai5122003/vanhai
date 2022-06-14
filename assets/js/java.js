$(document).ready(function() {
    $('#_slide .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('#product-featured .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: false,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    });
    var width_slider = $("#product-featured .owl-carousel").width();
    $(document).resize(function() {
        width_slider = $("#product-featured .owl-carousel").width();
        $("#product-featured .owl-next").css("left", width_slider);
    })
    $("#product-featured .owl-next").css("left", width_slider);
    // ---------------------------Xử lý hiện thị ảnh từ list lên thumb-----------------------
    var url_first = $("ul#product-photo-list li.product-photo:first-child a img").attr("src");
    $("#product-thumb img").attr("src", url_first);
    $("#zoom_product img").attr("src", url_first);
    var url;
    $("li.product-photo a").click(function() {
            url = $(this).children("img").attr("src");
            $("li.product-photo a").css("border", "1px solid  rgb(255, 255, 255)");
            $(this).css({ "border": "1px solid  rgb(151, 145, 145)" });
            $("#product-thumb img").attr("src", url);
            $("#product-thumb img").hide();
            $("#product-thumb img").fadeIn(300);
            return false;
        })
        //------------------- Xử lý hiển thị slide của list--------------------------
    var offset = 0;
    var width = $("ul#product-photo-list").width();
    if (width < (90 * 4)) {
        $(".button").hide();
    }
    $("#wp-product-photo-list .next").click(function() {
        var w = -(width - 90 * 4);
        if (offset > w) {
            offset -= 90;
            set_list(".next");
        }
        if (offset <= w) {
            disabled_list(".next");
        }
        reset_list(".prev");
    })
    $("#wp-product-photo-list .prev").click(function() {
        if (offset < 0) {
            offset += 90;
            set_list(".prev");
        }
        if (offset >= 0) {
            disabled_list(".prev");
        }
        reset_list(".next");
    })

    function reset_list(s) {
        $(s).css("opacity", "0.8");
        $(s).hover(function() {
                $(s).css("opacity", "1");
            },
            function() {
                $(s).css("opacity", "0.8");
            })
    }

    function set_list(s) {
        $("#product-photo-list").stop().animate({ "left": offset }, 300)
        $(s).css("opacity", "0.8");
        $(s).hover(function() {
                $(s).css("opacity", "1");
            },
            function() {
                $(s).css("opacity", "0.8");
            })
    }

    function disabled_list(s) {
        $(s).css("opacity", "0.2");
        $(s).hover(function() {
            $(s).css("opacity", "0.2");
        })
    }
    // ------------------------Xử lý phóng to ảnh thumb----------------------

    $('#product-thumb img').click(function() {
        $("#zoom_product img").attr("src", url);
        $("#wp-zoom-product").fadeIn(500);
    });
    $(".back").click(function() {
            $("#wp-zoom-product").fadeOut(500);
        })
        //-------------------------------- thêm vào giỏ hàng-----------
    var x_cart = $("#cart").offset().top;
    var y_cart = $("#cart").offset().left;
    var product_cart = [];
    var amount_product = 0;
    // -----------------------------------
    // ---------------------------------------------------
    // localStorage.removeItem("product_cart_list"); //xóa bộ nhớ local
    // -----------------------------------------------
    //---------------------------------------------------------
    if (localStorage['product_cart_list'] != "" && localStorage['product_cart_list'] != null) {
        product_cart = localStorage['product_cart_list'].split(",");
        $("#cart span").text(cal_amount_product());
    }
    // alert(localStorage['product_cart_list']);
    // alert(product_cart);

    var product_cart_news = ['src_img', 'product_name', 'price', 'amount'];
    $("#product-review .art-to-cart").click(function() {
        // xử lý hiệu ứng
        var x = $(this).offset().top;
        var y = $(this).offset().left;
        $("#art-to-cart-animate img").attr("src", url_first);
        // xử lý thêm số lượng sản phẩm vào giỏ hàng
        product_cart_news[0] = url_first;
        product_cart_news[1] = $(this).parent().find("h2").text();
        product_cart_news[2] = $(this).parent().find(".price span").text();
        product_cart_news[3] = 1;
        add_product();
        animate_add_cart(x, y);
        return false;
    })
    $(".product .art-to-cart").click(function() {
        var x = $(this).offset().top;
        var y = $(this).offset().left;
        var src_cart = $(this).parent().find("img").attr("src");
        $("#art-to-cart-animate img").attr("src", src_cart);
        animate_add_cart(x, y);
        product_cart_news[0] = src_cart;
        product_cart_news[1] = $(this).parent().find(".product-name").text();
        product_cart_news[2] = $(this).parent().find(".price").text();
        product_cart_news[3] = 1;
        add_product();
        return false;
    })

    function add_product() {
        if (product_cart != '') {
            var i3 = 1;
            var length_pr = product_cart.length;
            var t = 0;
            while (i3 < length_pr) {
                if (product_cart[i3] == product_cart_news[1]) {
                    t = i3;
                }
                i3 += 4;
            }
            if (t != 0) {
                product_cart[t + 2] += 1;
            } else {
                product_cart_news.forEach(function(a) {
                    product_cart.push(a);
                })
            }
        } else {
            // alert("aaaaaa");
            for (var i = 0; i < 4; i++) {
                product_cart.push(product_cart_news[i]);
                // console.log(product_cart)
            }
        }
        localStorage['product_cart_list'] = product_cart;
        display_cart();
        localStorage['price_total'] = cal_price();
    }

    function animate_add_cart(x, y) {
        $("#art-to-cart-animate").css({ "top": x, "left": y, "display": "block", "width": "50px" });
        $("#art-to-cart-animate").stop().animate({
                "top": x_cart,
                "left": y_cart,
                width: "10px"
            }, 2000,
            function() {
                $("#art-to-cart-animate").fadeOut(200);
                $("#cart span").text(cal_amount_product());
            })
    }
    display_cart();

    function display_cart() {
        var list_product = "";
        var m = product_cart.length / 4;
        for (var i = 0; i < m; i++) {
            list_product += "<li class='product-active flex'><a href='detail-product.html' class='product-img'><img src='";
            list_product += product_cart[i * 4];
            list_product += "'alt=''></a><div class='cart-info-product flex justify-between'><div><a href='detail-product.html' class='cart-pr-name'>"
            list_product += product_cart[i * 4 + 1];
            list_product += "</a><label for='amount-product-cart'>Số lượng</label><input type='number' name='' class='amount-product-cart' min='1' max='10' value='";
            list_product += product_cart[i * 4 + 3]
            list_product += "'><span class='cart-price'><span>"
            list_product += product_cart[i * 4 + 2];
            list_product += "</span>đ</span>" + "</div><button class='dl-product' data='" + i + "' >Xóa</button></div></li>";
        }
        $("#list-cart").html(list_product);
        $("#pay-price span").text(convert_price(cal_price()));
    }
    // var button_dl = document.getElementById("dl-product");
    $("#list-cart").on("click", '.dl-product', function() {
            // alert('aaaaaa')
            var pr_name = $(this).parent().find(".cart-pr-name").text();
            for (var i = 1; i < product_cart.length; i += 4) {
                if (pr_name == product_cart[i]) {
                    if (product_cart.length < 5) {
                        product_cart = [];
                        localStorage['product_cart_list'] = undefined;
                        alert("Hủy mua hàng")
                    } else {
                        product_cart.splice(i - 1, i + 3);
                    }

                }
            }
            localStorage['product_cart_list'] = product_cart;
            $("#cart span").text(cal_amount_product());
            var dat_offset = Number($(this).attr("data"));
            // alert(dat_offset);
            $("#list-cart .product-active").eq(dat_offset).hide(100);
            // display_cart();
            $("#pay-price span").text(convert_price(cal_price()));
            display_pay();
            localStorage['price_total'] = cal_price();
        })
        // tính số lượng sản phẩm
    function cal_amount_product() {
        if (product_cart != '') {
            var amount = 0;
            for (var i2 = 3; i2 < product_cart.length; i2 += 4) {
                product_cart[i2] = Number(product_cart[i2]);
                amount += product_cart[i2];
            }
            return amount;
        } else return 0;

    }

    function convert_price(a) {
        var b = [],
            a11 = '';
        if (a != 0) {
            a = a.toString();
            b = a.split('');
            b = b.reverse();
            for (var i = 3; i < b.length; i += 4) {
                b.splice(i, 0, '.')
            }
            b = b.reverse();
            b.forEach(function(a) {
                a11 += a;
            })
            return a11;
        } else return 0
    }

    function cal_price() {
        var t1, t2 = 0,
            t3 = 0;
        if (product_cart != '') {
            for (var i = 2; i < product_cart.length; i += 4) {
                t1 = product_cart[i];
                t2 = Number(t1.replace(".", ""));
                t2 = t2 * Number(product_cart[i + 1]);
                t3 += t2;
            }
            return (t3)
        } else return 0;

    }
    // thay đổi số lượng
    $("#list-cart").on("change", ".amount-product-cart", function() {
        var val_product = $(this).val();
        var name = $(this).parent().find(".cart-pr-name").text();
        product_cart.forEach(function(a, i) {
            if (a == name) {
                product_cart[i + 2] = val_product;
            }
        })
        localStorage['product_cart_list'] = product_cart;
        $("#pay-price span").text(convert_price(cal_price()));
        $("#cart span").text(cal_amount_product());
        display_pay();
        localStorage['price_total'] = cal_price();
    })

    //-------------------- list cart------------
    $("#cart").click(function() {
            if ($("#wp-list-cart").attr('data') != "disabled") {
                $("#wp-list-cart").toggle(300);
            }

        })
        //-------------------------------- xử lý bên thanh toán-----------
    $("#list-cart-pay").on("change", ".amount-product-cart-pay", function() {
        var val_product = $(this).val();
        var name = $(this).parent().find(".cart-pr-name").text();
        product_cart.forEach(function(a, i) {
            if (a == name) {
                product_cart[i + 2] = val_product;
            }
        })
        localStorage['product_cart_list'] = product_cart;
        $("#pay-price span").text(convert_price(cal_price()));
        $("#cart span").text(cal_amount_product());
        localStorage['price_total'] = cal_price();
        display_cart();
        display_pay();

    })
    display_pay();


    function display_pay() {
        // alert('aaa')_price_total
        _price_total = 0;
        var list_product_1 = "";
        var m = product_cart.length / 4;
        for (var i = 0; i < m; i++) {
            var t1 = '',
                t2 = 0;
            t1 = product_cart[i * 4 + 2];
            // console.log(t1)
            t2 = Number(t1.replace(".", ""));
            t2 = t2 * Number(product_cart[i * 4 + 3]);
            list_product_1 += "<li><div class='product_payment flex justify-between'><a href='detail-product.html' class='product-img'><img src='";
            list_product_1 += product_cart[i * 4];
            list_product_1 += "'alt=''></a><div class='cart-info-product flex justify-between'><div><a href='detail-product.html' class='cart-pr-name'>"
            list_product_1 += product_cart[i * 4 + 1];
            if ($("#list-cart-pay").hasClass("disabled")) {
                list_product_1 += "</a><label for='amount-product-cart-pay'>Số lượng</label><input type='number' name='' class='amount-product-cart-pay' min='1' max='10' disabled value='";
            } else {
                list_product_1 += "</a><label for='amount-product-cart-pay'>Số lượng</label><input type='number' name='' class='amount-product-cart-pay' min='1' max='10' value='";
            }
            list_product_1 += product_cart[i * 4 + 3]
            list_product_1 += "'><br><span class='price-one'>Giá:&nbsp;<span>"
            list_product_1 += product_cart[i * 4 + 2];
            list_product_1 += "</span><span>&nbsp;VNĐ</span></span></div><div class='price'><strong>Tổng:&nbsp;</strong><span>";
            list_product_1 += convert_price(t2);
            list_product_1 += "</span><span>&nbsp;VNĐ</span></div></div></div></li>"
        }
        // console.log(list_product_1);
        $("#list-cart-pay").html(list_product_1);
        $(".amount-provisional").text(convert_price(cal_price()));
        var ab = Number(localStorage['price_total']);
        $(".amount-total").text(convert_price(ab));
        // var n = cal_price() - cal_price() / 5;
        // $(".amount-total span:first-child").text(convert_price(n));
    }
    $("#to-pay-form, #pay-now").click(function() {
        if (cal_price() == 0) {
            alert("Chưa có sản phẩm nào trong giỏ hàng")
            return false
        }
    })
    localStorage['promotion_code'] = ['D1', "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"];
    $("#promotion button").click(function() {
        var code = [];
        var _price_total = 0;
        // console.log(localStorage['promotion_code'][4])
        code = localStorage['promotion_code'].split(',');
        var code_wed = $("#promotion input").val();
        var percent = -1;
        for (var i = 0; i < code.length; i++) {
            if (code_wed == code[i]) {
                percent = i;
            }
        }
        percent = percent + 1;
        _price_total = cal_price() - cal_price() * percent / 100;
        $(".amount-total").text(convert_price(_price_total));
        localStorage['price_total'] = _price_total;
        return false;
    })
    $("#form-buyer").submit(function() {
        $("#info-buyer").parent().hide();
        $("#success").show(200);
        product_cart = '';
        localStorage['product_cart_list'] = product_cart;
        $("#cart span").text('0');
        localStorage['price_total'] = 0;
        return false
    })
    $(".payments").click(function() {
        if ($(this).val() == 1) {
            $("#bank-input").attr('required', 'required')
        } else {
            $("#bank-input").removeAttr('required')
        }
    })
    $("#address-sl").change(function() {
        var a = $("#address-sl :selected:checked").val();
        a = Number(a) - 1;
        $("#address-pay").text($("#footer .address").eq(a).text());

    })
});