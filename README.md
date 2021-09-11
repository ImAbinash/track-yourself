# TrackYourself

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

# Dependencies
    npx @angular/cli add @angular/material
    npx @angular/cli add @angular/fire
    npm i -s @angular/flex-layout
    npm install --save hammerjs
    npm install moment
    npm i uuid
    npm i @types/uuid
    npm install ngx-toastr

    
# CLI Commands
    1. generate module: npx ng generate module { module name }
    2. generate routing with module: npx ng generate module { module name } --routing
    3. generate component: npx ng g component { component name }
    4. 


# Important url
    - Angular fire new url
    https://github.com/angular/angularfire/blob/HEAD/docs/install-and-setup.md


# Feature added 
This section logs what are the features added and when.

<details>
   <summary>05-Sep-2021</summary>
   <ol>
      <li>Created angular project using angular cli</li>
      <li>Created Feature module i.e auth,category with core directory</li>
   </ol>
</details>

<details>
   <summary>10-Sep-2021</summary>
   <ol>
      <li>Category and subcategory module end to end created</li>
      <li>Toast message implemented</p>
      <li>Splitted navigation component i.e header and sidenav to 2 different component and kept in core directory</li>
      <li>Routing corrected and did cusmetic changes</li>
      <li>For login/logout, authstore service modified, need more improvement in future<li>
      <li>dummy logo aded</li>
   </ol>
</details>
<details>
   <summary>11-Sep-2021</summary>
   <ol>
      <li>Proper use of subject variabble when we are creating any or updating any category or subcategory, need more improvement while creating subcategory.</li>
      <li>implemented mat-table to show subcategories under category</li>
   </ol>
</details>