export class MyLinks{

  loading_html = `<div>
  <div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div>
</div>`;

/*<div class="spinner">
  <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    </div>*/

  url = 'https://apployalty.000webhostapp.com/loyalty.php?';
  database = 'db=id5733007_mydb';


  // Actions
  a_get_coupons = '&action=get_coupons';
  a_coupon_creation = '&action=coupon_creation';
  a_coupon_deletion = '&action=coupon_deletion';
  a_coupon_save = '&action=coupon_save';

  a_stamp_change = '&action=stamp_change';
    a_stamp_change_add = '&operation=add';
    a_stamp_change_remove = '&operation=remove';

  a_coupon_credit = '&action=coupon_credit';

  a_customer_login = '&action=customer_login';
  a_customer_creation = '&action=customer_creation';
  a_customer_deletion = '&action=customer_deletion';
  a_search_customer = '&action=search_customer';
  a_customer_save = '&action=customer_save';
  a_operator_login = '&action=operator_login';

  a_operator_creation = '&action=operator_creation';
  a_operator_deletion = '&action=operator_deletion';
  a_search_operator = '&action=search_operator';
  a_operator_save = '&action=operator_save';
  a_get_db = '&action=get_db';
  a_get_pie_chart = '&action=get_pie_chart';
  a_get_track_visits = '&action=track_visit';
  a_get_visits_by_day = '&action=get_visits_by_day';
  a_get_available_months = '&action=get_available_months';
  a_get_days_chart = '&action=get_days_chart';

  base = this.url+this.database;

  constructor(){

  }
}
