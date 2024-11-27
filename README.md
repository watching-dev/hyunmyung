# HyunMyung <img src="https://github.com/user-attachments/assets/de61148d-af01-49d1-a76c-8e779782e0eb" width="20%">

### README. 현명의 웹사이트 블로그

<!-- ![opengraph-image](https://github.com/user-attachments/assets/de61148d-af01-49d1-a76c-8e779782e0eb) -->

HyunMyung은 iOS에서 React로 전향하는 이유로 시작된 프로젝트다.

포트폴리오 및 블로그의 기능을 제공하는 웹 애플리케이션이며,

개발과정과 개발하면서 알게 된 모든것을 기록하기 위해 개발했다.

> 현재(24/11/27) v1.1.1 까지 release 되었으며, https://hyunmyung.com 주소로 운영되고 있다.

## Architecture

![Architecture](https://github.com/user-attachments/assets/f2371fef-f20b-4a27-9ca3-90cac5d1a4a5)
Data <-> Next.JS Front <-> Next.JS Back <-> mongoDB

> ### Front.End

- React.JS
- TypeScript
- Next.JS
- Next-Auth(Auth.JS)
- Quill Editor ( WYSIWYG Editor )
  ![Front](https://github.com/user-attachments/assets/a964858e-bc09-43a6-b540-040669ef1d64)

> ### Back.End

- Next.JS
- TypeScript
- React-Query
- Mongoose
- MonggDB
- FireBase(FireStorage)
  ![Back](https://github.com/user-attachments/assets/df777b28-5813-4be8-9d25-15e44d6ebd10)

> ### Deploy

- Vercel
  ![Deploy](https://github.com/user-attachments/assets/e4abdf99-4393-40de-b2bc-21bf7ca77c33)
  ***

<br /><br />

### Screen Shot

|                                                     Main(Magazine)                                                      |                                                        Recommend                                                         |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <img width="100%" alt="magazine" src="https://github.com/user-attachments/assets/861ac603-d17e-4e80-a5d0-4349893b38a2"> | <img width="100%" alt="recommend" src="https://github.com/user-attachments/assets/dda1c188-03ec-4200-8ba0-1a6bb5b9c294"> |

|                                                     Infinite Scroll                                                      |                                          Responsive                                          |
| :----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| <img width="100%" alt="recommend" src="https://github.com/user-attachments/assets/00f9fe6c-037f-40da-bb39-57495263cb24"> | ![reacting](https://github.com/user-attachments/assets/f597e629-240c-412e-886b-960266a3427e) |

|                                                        Search                                                         |                                                        Profile                                                         |
| :-------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img width="100%" alt="search" src="https://github.com/user-attachments/assets/05f3fa0b-7369-4993-8acf-3ef0423478d3"> | <img width="100%" alt="profile" src="https://github.com/user-attachments/assets/7c797698-eafd-40bf-b191-eeab32f894b9"> |

<br/>

> 무한스크롤, 반응형이 적용되어 있다.

---

<br /><br />

## 전체 구조

<details>
<summary>구조 펼치기/접기</summary>

<!-- summary 아래 한칸 공백 두어야함 -->

```
📦src
┣ 📂app
┃ ┣ 📂(afterLogin)
┃ ┃ ┣ 📂_component
┃ ┃ ┃ ┣ 📜LogoutButton.tsx
┃ ┃ ┃ ┣ 📜PostingButton.tsx
┃ ┃ ┃ ┣ 📜QuillEditor.tsx
┃ ┃ ┃ ┣ 📜RQProvider.tsx
┃ ┃ ┃ ┣ 📜ReactQuillWrapper.tsx
┃ ┃ ┃ ┣ 📜UploadBanner.tsx
┃ ┃ ┃ ┣ 📜logoutButton.module.css
┃ ┃ ┃ ┣ 📜postingButton.module.css
┃ ┃ ┃ ┗ 📜uploadBanner.module.css
┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┣ 📜getBanner.ts
┃ ┃ ┃ ┣ 📜getPostAll.ts
┃ ┃ ┃ ┗ 📜getPosts.ts
┃ ┃ ┣ 📂_util
┃ ┃ ┣ 📂banner
┃ ┃ ┃ ┣ 📜bannerPage.module.css
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂history
┃ ┃ ┗ 📂posting
┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┗ 📜posting.module.css
┃ ┣ 📂(beforeLogin)
┃ ┃ ┣ 📂@modal
┃ ┃ ┃ ┣ 📂(.)login
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂(.)signup
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┗ 📜default.tsx
┃ ┃ ┣ 📂[username]
┃ ┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┃ ┗ 📜getUsers.ts
┃ ┃ ┃ ┗ 📂status
┃ ┃ ┃ ┃ ┗ 📂[slug]
┃ ┃ ┃ ┃ ┃ ┣ 📂_component
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SinglePost.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜getSinglePost.ts
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜getSinglePostServer.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┃ ┃ ┗ 📜singlePost.module.css
┃ ┃ ┣ 📂_components
┃ ┃ ┃ ┣ 📂homeSection
┃ ┃ ┃ ┃ ┣ 📂homeLeftSection
┃ ┃ ┃ ┃ ┃ ┣ 📜LeftSectionLogo.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜LeftSectionNavMenu.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜leftSectionLogo.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜leftSectionNavMenu.module.css
┃ ┃ ┃ ┃ ┣ 📂homeMainSection
┃ ┃ ┃ ┃ ┃ ┣ 📂tab
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜.DS_Store
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BackButton.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Banner.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MonthlyMagazine.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Post.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostAll.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostArticle.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostForm.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostRecommends.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Tab.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TabDecider.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TabProvider.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜backButton.module.css
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜banner.module.css
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜post.module.css
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜postForm.module.css
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜profileView.module.css
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜profileView.tsx
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜tab.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜.DS_Store
┃ ┃ ┃ ┃ ┣ 📂homeRightSection
┃ ┃ ┃ ┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜getRecommend.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜Contact.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜RecommendPost.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜RightSectionRecommend.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜RightSectionSearch.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜contact.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜recommendPost.module.css
┃ ┃ ┃ ┃ ┃ ┣ 📜rightSectionRecommend.module.css
┃ ┃ ┃ ┃ ┃ ┗ 📜rightSectionSearch.module.css
┃ ┃ ┃ ┃ ┣ 📜HomeLeftSection.tsx
┃ ┃ ┃ ┃ ┣ 📜HomeRightSection.tsx
┃ ┃ ┃ ┃ ┣ 📜homeLeftSection.module.css
┃ ┃ ┃ ┃ ┗ 📜homeRightSection.module.css
┃ ┃ ┃ ┣ 📂login
┃ ┃ ┃ ┃ ┣ 📜LoginModal.tsx
┃ ┃ ┃ ┃ ┗ 📜loginModal.module.css
┃ ┃ ┃ ┣ 📂profileSection
┃ ┃ ┃ ┃ ┗ 📜HomeRightSectionProfileImage.tsx
┃ ┃ ┃ ┗ 📂signup
┃ ┃ ┃ ┃ ┣ 📜SignUpModal.tsx
┃ ┃ ┃ ┃ ┗ 📜signupmodal.module.css
┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┣ 📜sanitizeHTML.ts
┃ ┃ ┃ ┗ 📜singup.ts
┃ ┃ ┣ 📂about
┃ ┃ ┣ 📂constant
┃ ┃ ┃ ┗ 📜metadata.ts
┃ ┃ ┣ 📂explore
┃ ┃ ┃ ┣ 📜explore.module.css
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂login
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂post
┃ ┃ ┃ ┗ 📂[[...slug]]
┃ ┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜postSlug.module.css
┃ ┃ ┣ 📂profile
┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┗ 📜profile.module.css
┃ ┃ ┣ 📂search
┃ ┃ ┃ ┣ 📂_component
┃ ┃ ┃ ┃ ┗ 📜SearchResult.tsx
┃ ┃ ┃ ┣ 📂_lib
┃ ┃ ┃ ┃ ┗ 📜GetSearchResult.ts
┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┗ 📜search.module.css
┃ ┃ ┣ 📂signup
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂user
┃ ┃ ┃ ┗ 📂join
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📜layout.module.css
┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┣ 📜page.tsx
┃ ┃ ┗ 📜rightSectionMain.module.css
┃ ┣ 📂_component
┃ ┃ ┣ 📜AuthSession.tsx
┃ ┃ ┗ 📜MSWComponent.tsx
┃ ┣ 📂_lib
┃ ┃ ┣ 📜database.ts
┃ ┃ ┗ 📜dbConnect.ts
┃ ┣ 📂api
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📂[...nextauth]
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂banner
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂infinitePost
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂login
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂post
┃ ┃ ┃ ┣ 📂detail
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┃ ┣ 📂temp
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂posts
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂profile
┃ ┃ ┃ ┣ 📂id
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂recommend
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂search
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┗ 📂user
┃ ┃ ┃ ┣ 📂join
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┃ ┣ 📂update
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┃ ┗ 📜route.ts
┃ ┣ 📂fonts
┃ ┃ ┣ 📜GeistMonoVF.woff
┃ ┃ ┗ 📜GeistVF.woff
┃ ┣ 📂model
┃ ┃ ┣ 📜Banner.ts
┃ ┃ ┣ 📜Post.ts
┃ ┃ ┣ 📜PostImage.ts
┃ ┃ ┣ 📜Posts.ts
┃ ┃ ┣ 📜Profile.ts
┃ ┃ ┣ 📜User.ts
┃ ┃ ┣ 📜join.ts
┃ ┃ ┣ 📜posting.ts
┃ ┃ ┗ 📜userJoin.ts
┃ ┣ 📜.DS_Store
┃ ┣ 📜favicon.ico
┃ ┣ 📜global.d.ts
┃ ┣ 📜globals.css
┃ ┣ 📜icon.ico
┃ ┣ 📜layout.tsx
┃ ┣ 📜opengraph-image.png
┃ ┗ 📜svg태그 추출-svg 붙이고 w,h넣고 이 파일 열어서 마우스 오른쪽 다운 png 다운됨.html
┣ 📂firebase
┃ ┗ 📜config.ts
┣ 📂mocks
┃ ┣ 📜browser.ts
┃ ┣ 📜handlers.ts
┃ ┗ 📜http.ts
┣ 📜.DS_Store
┣ 📜auth.ts
┗ 📜middleware.ts
```

</details>

---
