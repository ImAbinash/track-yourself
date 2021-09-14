https://dribbble.com/shots/4845401-UI-Design
https://dribbble.com/shots/15243129-Personal-Wallet-and-Banking-Dashboard-User-Interface-Concept
https://dribbble.com/shots/15299500-Server-Management-App-Dashboard-UI-Exploration

Dashboard
https://spark.bootlab.io/dashboard-default.html



Track-Yourself
--------------

1.	Screen
	a.	Login
	b. 	Register
	c. 	Dashboard
	d.	
	
	
2. 	Screen wise features (Page)
	a. 	login Screen
		-> 	Email/PhoneNumber
		->	password/ OTP
		
	b.	Registration Screen (Page)
		->	FirstName
		->	LastName
		-> 	Gender
		->	DOB
		-> 	EmailId
		->	PhoneNumber
		->	Password
		->	ConfirmPassword
		->	AcceptTerms&Condition
		
	c.	Verify your mobile number (Modal)
		-> 	MobileNumber 
		-> 	OTP
	
	d. 	Create Category / Read Category / Update category 
		-> 	Income
			-> 	Salary
			->	Interest
			->	Business
			-> 	Bank Deposite
			->	Refund
			-> 	Rewards
			
		->	Expense
			->	Bills
			->	EMI
			->	Entertainment
			->	Food&Drink
			->	Fuel
			->	Groceries
			->	Health
			->	Investment
			->	Shopping
			->	Transfer
			->	Travel
			->	Others
			-> 	Create More Category(+)
			
		->	Savings/Investments
			->	RD
			->	PPF
			->	MF
			->	Lic
		
		-> Add more categories (+)
		
	e. 	Tab (All/ Income/Expense ...etc dynamically generate based on categories)  (CRUD)
		-> It will show in table
			->	Sl No
			-> 	Cateogry
			->	Sub category
			->	Amount
			-> 	Description
			->	Date on
	
	f.	Dashboard
		->	Day view
		->	Weekly view
		->	Monthly view
		->	Yearly view
		->	Date Range (Manual selection)
		
3.	DB DESIGN

		-> 	User
			-> 	new_uuid
				-> 	id: uuid
				->	emailId
				->	firstName
				->	lastName
				->	Gender
				->	DOB
				->	mobileNumber
				->	isVerifiedEmail
				->	isVerifiedMobileNumber
				->	isAcceptedTermsAndConditions
				->	createdOn
				->	updatedOn
				->	plan
				->	isActive
				->	isEnable
		-> 	category
			->	uuid ( generated user id in user table
				-> uuid
					->	id: uuid
					->	userId: uuid (generated in user table)
					->	categoryName
					->	isActive
					->	isEnable
					->	createdDate
					->	updatedDate
					->	subCategory
						->	uuid
							->	subCategoryName
							->	isActive
							->	isEnable
							->	createdDate
							->	updatedDate
		-> 	operatedAgainst
			->	uuid ( generated user id in user table)
				->	tag:	#TCS, #KARE4U, #LIC, #ABAP, #PPF
				
		->	CashFlow
			->	uuid ( generated user id in user table
				-> UUID auto generated id	
					->	amount
					->	description
					-> 	categoryType (income|Expense|Debt ...etc (category type)
					->	subCategoryType (Salary, Entertainment, Investment, Debt..etc)
					->	operatedAgainst (use tag for search, take values from operatedAgainst document)
					->	operatedOnInstance  (when did you do this operation i.e spend or income which time)
					->	createdDate
					-> 	updatedDate
					-> 	isActive
					->	isEnable
					
				
Angular project structure
	->	https://blogs.halodoc.io/angular-best-practices/
	
Angular HTTP Interceptor
	-> 	https://ultimatecourses.com/blog/intro-to-angular-http-interceptors
	
Angular Caching
	->	https://blog.logrocket.com/caching-with-httpinterceptor-in-angular/	

Angular sass external style (_varraible.scss ...etc):
	-> 	https://www.digitalocean.com/community/tutorials/angular-shortcut-to-importing-styles-files-in-components
	
Angular reactive form validation
	-> 	https://blog.angular-university.io/angular-custom-validators/

Angular important articles
	->	https://www.kiltandcode.com/2020/08/13/show-validation-error-messages-for-reactive-forms-in-angular-9/
	
Angular cross form field vaidation: 
	->	https://offering.solutions/blog/articles/2020/05/03/cross-field-validation-using-angular-reactive-forms/
	
Angular fire with firebase and angular	
	->	https://www.bezkoder.com/angular-10-firestore-crud-angularfire/
	
	https://indepth.dev/posts/1441/handling-realtime-data-storage-in-angular-using-firebase-cloud-firestore
	
	https://www.positronx.io/full-angular-7-firebase-authentication-system/
	
New Angualr fire with firestore 
	->	https://github.com/angular/angularfire/blob/HEAD/docs/install-and-setup.md

Angular flex box css grid system(VVI)
	-> 	https://indepth.dev/posts/1208/angular-flex-layout-flexbox-and-grid-layout-for-angular-component