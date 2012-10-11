/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 10/11/12
 * Time: 9:04 AM
 */

$('#details').live('pagebeforeshow', function (event, ui) {
    // Setting username label
    $('#lblUsername').html(selectedGeek.escape('username'));
});