#### `05/08/2022`

- 🆕 Add `sortable` field for `ResoTable`

#### `2022-07-11` `TrungLV:`

- 🆕 call new api in `ProductProgressReport`
- 🐞 Fix new api collumn Table `ProductProgressReport`
- 🐞 disable ApexChart
- 🆕 set new ProductProgressReport type

#### `2022-07-05` `Phuoclt:`

###### Report system

- 🆕 Update column in product-report
- 🆕 Update type `TProductSaleReportBase` in product-report (new api)
- 🐞 Fix only fetch overview api when finish before fetching and disable choose date when fetching api in `RevenueOverview.tsx`

#### `2022-07-04` `Phuoclt:`

###### Report system

- 🆕 Setup api get list product
- 🆕 Setup and create `AutocompleteProduct` , create `useProduct` hook and fix default param in `useStore` and `useTrading`
- 🆕 Update `comlun.ts` in productProgress to `comlumn.tsx` to using react element
- 🐞 Fix defaultfitlers resotable promotion

#### `2022-07-01` `Phuoclt:`

###### Report system

- 🔥 Setup and call category api `category.ts` and type `productSaleCategory.ts`, update `column` to call api to resotable
- 🔥 Setup and call product progress api `getProductLine` and type `TProductLineBase`, update `column` to call api to resotable
- 🔥 Setup and call payment api `payment.ts` and type `payment.ts`, update `column` to call api to resotable
- 🛠 Remove `types/report/productProgress.ts` and `types/report/productSale.ts`
- 🆕 Add picker date to ProductProgressReport, ProductSaleReport, Payment component

#### `2022-06-30` `TrungLV:

- 🆕 set new chart in `ProductProgressReport`
- 🆕 set new chart in `ProductSaleReport`
- 🛠 set `dataIndex: storeId` in column to render items
- 🛠 set param `storeId` in `getData` section
- 🛠 set storeId in Promotion collumn type

#### `2022-06-30` `Phuoclt:`

###### Report system

- 🔥 Setup and call overview-report api. Create `revenueOverview.ts` type and `revenue.ts` api
- 🆕 Update `TableCard.tsx` and add loading screen wait api
- 🐞 Fix only call api if user finish pick daterange and disable if api is loading
- 🛠 Update type and name `productSaleReport` section

#### `2022-06-29` `TrungLV:`

- 🆕 set new api collumn in `Promtion Report`
- 🆕 call new api in `Promtion Report`
- 🐞 change and renew `Date, Day, Month` `DateTimePicker` fucntion

#### `2022-06-29` `Phuoclt:`

###### Report system

- 🆕 Create `AutocompleteStore.tsx` , hook `useStore` and update `column.ts` to `column.tsx`
- 🆕 Select store with `AutocompleteStore.tsx`

#### `2022-06-28` || `TrungLV:`

- 🐞 Fix date range picker function use tableRef in Date, Day, Month report

#### `2022-06-28` `Phuoclt:`

###### Report system

- 🐞 Fix date range with default and dont call with null value
- 🛠 Refactor code: remove unused code in overview component

#### `2022-06-27` `Phuoclt:`

###### Report system

- 🌐 Add new format date (`YYYY-MM-DD`)
- 🐞 Fix type params api
- 🆕 Add api store and type api
- 🛠 Refactor code: remove `column.ts` in ProductProgressReport and unused code

#### `2022-06-25` `Phuoclt:`

###### Report system

- 🛠 Refactor code: using the same format function and clear code
- 🌐 Remove a format currency vnd `fCurrencyVN`
- 🌐 Add a new format time only `fTime`

#### `2022-06-24` || `TrungLV:`

- 🛠 showAction in ResoTable fucnction
- 🛠 call fake api Date, Day, Time, Month by useRef, useEffect

#### `2022-06-24` `Phuoclt:`

###### Report system

- 🆕 Add `productSale.ts` and `productProgress` in type to manage type of productSale and productProgress
- 🛠 Refactor code: create `config.ts` in productSale and productProgress component to manage column Resotable
- 💄 Change the same spacing product and overview component and add tab ui in productSale and productProgress
- 🌐 Create a format currency vnd `fCurrencyVN`

#### `2022-06-20` || `TrungLV:`

- 🛠 get id in api Promotion Page to get promotion by id
- 💄 change path of pallete color, hover color in all widget fields
- 🛠 get fake api in Promotion by datasource
- 🛠 get fake api in promotion chart function
- 🛠 make new color in `pallete.ts`
- 🆕 remake collumn type in `src\types\report\promotion.ts`
- 🆕 call fake api in Date, Day, Time report in `trading chart`

#### `2022-06-22` `Phuoclt:`

###### Report system

- 🆕 Create `products.ts` to call api report sale products
- 🆕 Add filter report sale products with date range
- 🛠 Remove unused file in `src/redux`

#### `2022-06-21` `Phuoclt:`

###### Report system

- 💄 Mock data resotable and overview date month ui
- 🛠 Remove unused code

#### `2022-06-20` || `TrungLV:`

- 🛠 promotion api function
- 💄styling dashboard widget
- 🆕 fix new widget and add link to function of widget
- 🆕 change router of `trading` report
- 💄styling all dashboard funtion and section
- 🛠 get fake api in Promotion page
- 🆕 add new component : Date, Month, Time report
- 🛠 trading report columm section paths
- 🛠 set new router for Day, Date, Time, Month report

#### `2022-06-19` `Phuoclt:`

###### Promotion system

- 🆕 Handle submit create promotion with react-hook-form and watch data to preview section

###### Report system

- 💄 Fix UI overview date and optimize table card component
- 🆕 Add new palete (report paletes)

#### `2022-06-17` `Phuoclt:`

- 🌐 Update locale promotion system
- 🔥 Call api get promotion
- 🔥 Create DateTimePickerField component
- 🐞 Change port `env.development` 8000 to 8080 (fix CORS call api promotion)
- 🆕 Update column (add dataIndex) call api promotion
- 🆕 Add field for promotion api type
- 💄 Fix UI StepOne.tsx + StepTwo.tsx create promotion section

#### `2022-06-17` || `TrungLV_[FE]`

- 🐞: Fix `SelectField` in Voucher to filter value in Resotable
- 🆕Change port in `env.development` to 8080
- 🔥 Create `voucher.ts` to get API
- 🛠 Get Api in Voucher

```
💄 for styling
🐞 for bug fix
🔥 for new feature
🆕 for new update of feature
🛠 Refactor
🌐 Locale
🗑 Remove
⚡️ Optimize perf
```
