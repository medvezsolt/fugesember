      //<![CDATA[
      var related_posts = [];
      var related_posts2 = [];
      var related_filled = [];
      var related_filled2 = [];
      function prepare_related_posts_list( json ){
          var posts = json.feed.entry;

          if (typeof related_post_content_sorted != "undefined") {
            posts = posts.sort((a, b) => {
              if (a.title.$t < b.title.$t) {
                return -1;
              }
            });
          }

          posts.forEach(function(p, v){
              //-- Prepare the link of related post
              let p_link = get_single_post_link(p);
              let related_post = {
                  title: p.title.$t,
                  content: getSnippet(p.content.$t, 250),
                  link: p_link,
                  image: {
                      el: "",
                      src: ""
                  }
              };

              //-- Get the html content of post that will be used to retrieve post image
              let content_html = new DOMParser().parseFromString(p.content.$t, 'text/html');
              let image = content_html.querySelector("img");
              //-- If image is found set the image src
              if (image instanceof HTMLImageElement) {
                  related_post.image.el = image;
                  related_post.image.src = image.src;
              }
              //-- If post link is not equal to current link and not already filled then add to list
              if (p_link != current_post_link && !related_filled.includes(p.title.$t)) {
                  related_posts.push(related_post);
                  related_filled.push(p.title.$t);
              }
          });
          //-- Finally print the related posts on after document has loaded
          window.addEventListener("load", function () {
              print_related_posts();
          });
      }
      //-- Function to prepare the post link in loop
      function get_single_post_link(p) {
          var link = "javascript:void(0)";
          if ("link" in p) {
              for (let i = 0; i < p.link.length; i++) {
                  if (p.link[i].type == "text/html" && p.link[i].rel == "alternate") {
                      link = p.link[i].href;
                      break;
                  }
              }
          }

          return link;
      }
      //-- Function to print related post after document load
      function print_related_posts() {
          if (typeof no_related_posts != "undefined" && no_related_posts) return false;
          if (related_posts.length) {
              var html = "";
			  if (typeof related_post_content_widget_title != "undefined") {
              	html += '<h3>' + related_post_content_widget_title + '</h3>';
              } else {
              	html += '<h3>Kapcsolódó cikkek:</h3>';
              }
              html += '<div class="row">';
              //-- If related posts list has reached the number of posts we need, break the loop
              for (let i = 0; i < related_posts.length; i++) {
                  if (i >= max_related_posts)
                      break;

                  html += '<div class="col-xs-6">' +
                          '<div class="related-post">' +
                          '<div class="related-post-image" style="background-image: url(' + related_posts[i].image.src + ')">' +
                          '</div>' +
                          '<div class="related-post-title">' +
                          '<a href="' + related_posts[i].link + '">' + related_posts[i].title + '</a>' +
                          '</div>';
			  if (typeof related_post_content != "undefined") {
                  html += '<div class="related-post-content">' + related_posts[i].content + '</div><a class="snippet-fade r-snippet-fade" href="' + related_posts[i].link + '"></a>';
              }
                  html += '</div>' +
                          '</div>';
              }
              html += '</div>';
              document.querySelector(".related-posts").innerHTML = html;
          }
      }
      function prepare_related_posts_list2( json ){
          var posts2 = json.feed.entry;

          if (typeof related_post2_content_sorted != "undefined") {
            posts2 = posts2.sort((a, b) => {
              if (a.title.$t < b.title.$t) {
                return -1;
              }
            });
          }

          posts2.forEach(function(p, v){
              //-- Prepare the link of related post
              let p_link = get_single_post_link(p);
              let related_post2 = {
                  title: p.title.$t,
                  content: getSnippet(p.content.$t, 250),
                  link: p_link,
                  image: {
                      el: "",
                      src: ""
                  }
              };

              //-- Get the html content of post that will be used to retrieve post image
              let content_html = new DOMParser().parseFromString(p.content.$t, 'text/html');
              let image = content_html.querySelector("img");
              //-- If image is found set the image src
              if (image instanceof HTMLImageElement) {
                  related_post2.image.el = image;
                  related_post2.image.src = image.src;
              }
              //-- If post link is not equal to current link and not already filled then add to list
              if (p_link != current_post_link && !related_filled2.includes(p.title.$t)) {
                  related_posts2.push(related_post2);
                  related_filled2.push(p.title.$t);
              }
          });
          //-- Finally print the related posts2 on after document has loaded
          window.addEventListener("load", function () {
              print_related_posts2();
          });
      }
      function print_related_posts2() {
          if (related_posts2.length) {
              var html = "";
              if (typeof related_post2_content_type == "undefined") { related_post2_content_type = ""; }

              switch(related_post2_content_type) {
                case 'list':
                  html += '<ul style="text-align: left;">';
                  for (let i = 0; i < related_posts2.length; i++) {
                      if (i >= max_related_posts2)
                          break;

                      html += '<li><a href="' + related_posts2[i].link + '">' + cleanTitle(related_posts2[i].title) + '</a></li>';
                  }
                  html += '</ul>';
                  break;

                default:
                  if (typeof related_post2_content_widget_title != "undefined") {
                    html += '<h3>' + related_post2_content_widget_title + '</h3>';
                  } else {
                    html += '<h3>Kapcsolódó cikkek:</h3>';
                  }
                  html += '<div class="row">';
                  for (let i = 0; i < related_posts2.length; i++) {
                      if (i >= max_related_posts2)
                          break;

                      html += '<div class="col-xs-6">' +
                              '<div class="related-post">' +
                              '<div class="related-post-image" style="background-image: url(' + related_posts2[i].image.src + ')">' +
                              '</div>' +
                              '<div class="related-post-title">' +
                              '<a href="' + related_posts2[i].link + '">' + related_posts2[i].title + '</a>' +
                              '</div>';
                  if (typeof related_post2_content != "undefined") {
                      html += '<div class="related-post-content">' + related_posts2[i].content + '</div>' +
                              '<a class="snippet-fade r-snippet-fade" href="' + related_posts2[i].link + '"></a>';
                  }
                      html += '</div>' +
                              '</div>';
                  }
                  html += '</div>';
              }
              document.querySelector(related_post2_content_destination).innerHTML = html;
          }
      }

      function cleanTitle(text) {
		  text = text.replace(" – fajtabemutató","");
          return text;
      }

      function getSnippet(text, length) {
		  var txt = stripHtml(text);
          var rx = new RegExp("^.{" + length + "}[^ ]*");
          return rx.exec(txt)[0];
      }

      function stripHtml(html){
         let tmp = document.createElement("DIV");
         tmp.innerHTML = html;
         return tmp.textContent || tmp.innerText || "";
      }
      //]]>