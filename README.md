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
    ag-grid-community ag-grid-angular

    
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
      <li>[+] Feature module: CashFlow</li>
      <li>Cash-flow ui desgin: it logs all the cash flow activities like income, expense, saving ..etc and shown all the recent activities in the ag grid table</li>
      <li>[+] Feature module: Dashboard</li>
   </ol>
</details>
<details>
   <summary>12-Sep-2021</summary>
   <ol>
      <li>Service integration for cashflow</li>
      <li>category, subcategory memory leak fixed</li>
      <li>Tag feature for searching fixed</li>
      <li>App deployed successfully: URL: https://track-yourself-2021-4d103.firebaseapp.com/</li>
   </ol>
</details>
<details>
   <summary>13-Sep-2021</summary>
   <ol>
      <li>Bug fix: JSON.parse issue while landing</li>
      <li>Toast message timer increases to 5000 and added progress bar to toast message</li>
      <li>Side nav ui width issue fixed (cosmatic changes).</li>
      <li>Show selected cashflow row in modal</li>
   </ol>
</details>
<details>
   <summary>14-Sep-2021</summary>
   <ol>
      <li>Dashboard page dessign started</li>
      <li>Showing amount based on category </li>
      <li>dashboard: showing data for selected category in ag grid table(to select tap on category card)</li>
   </ol>
</details>
<details>
   <summary>15-Sep-2021</summary>
   <ol>
      <li>Dashboard/Cash-Flow: Showing rupee symbol with price in table</li>
   </ol>
</details>