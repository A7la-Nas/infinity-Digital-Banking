define(['CommonUtilities', 'ViewConstants', 'OLBConstants'], function(CommonUtilities, ViewConstants, OLBConstants) {

    var responsiveUtils = new ResponsiveUtils();

    return {
        inputJsonData: null,
        statusSkinsDetailsScreen: {},
        cardImages: {},
        setData: function(jsonData) {
            this.inputJsonData = jsonData;
            this.statusSkinsDetailsScreen['Active'] = ViewConstants.SKINS.CARDS_ACTIVE_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Issued'] = ViewConstants.SKINS.CARDS_ACTIVE_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Locked'] = ViewConstants.SKINS.CARDS_LOCKED_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Reported Lost'] = ViewConstants.SKINS.CARDS_REPORTED_LOST_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Replace Request Sent'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Replaced'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Cancel Request Sent'] = ViewConstants.SKINS.CARDS_CANCEL_REQUEST_SENT_STATUS_DETAILS;
            this.statusSkinsDetailsScreen['Cancelled'] = ViewConstants.SKINS.CARDS_CANCELLED_STATUS_DETAILS;
            this.cardImages['My Platinum Credit Card'] = ViewConstants.IMAGES.PREMIUM_CLUB_CREDITS;
            this.cardImages['Gold Debit Card'] = ViewConstants.IMAGES.GOLDEN_CARDS;
            this.cardImages['Premium Club Credit Card'] = ViewConstants.IMAGES.PLATINUM_CARDS;
            this.cardImages['Shopping Card'] = ViewConstants.IMAGES.SHOPPING_CARDS;
            this.cardImages['Petro Card'] = ViewConstants.IMAGES.PETRO_CARDS;
            this.cardImages['Eazee Food Card'] = ViewConstants.IMAGES.EAZEE_FOOD_CARDS;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var card = jsonData;
            CommonUtilities.setText(this.view.lblCardName, card.accountName, accessibilityConfig);
            CommonUtilities.setText(this.view.lblCardStatus, this.geti18nDrivenString(card.cardStatus), accessibilityConfig);
            this.view.lblCardStatus.skin = this.statusSkinsDetailsScreen[card.cardStatus];
            this.view.imgCard.src = this.getImageForCard(card.productName);
            CommonUtilities.setText(this.view.lblKey1, kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValue1, card.cardNumber, accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey2, kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValue2, card.validThrough, accessibilityConfig);
            CommonUtilities.setText(this.view.lblKey3, card.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.WithdrawalLimit") + ":" : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValue3, card.cardType === 'Debit' ? card.dailyWithdrawalLimit : card.creditLimit, accessibilityConfig);
            this.view.flxDetailsRow4.setVisibility(card.cardType === 'Credit');
            CommonUtilities.setText(this.view.lblKey4, kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit") + ":", accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValue4, card.availableCredit, accessibilityConfig);
            this.view.imgCardMobile.src = this.getImageForCard(card.productName);
            CommonUtilities.setText(this.view.lblCardHeader, card.productName, accessibilityConfig);
            CommonUtilities.setText(this.view.rtxValueMobile, card.maskedCardNumber, accessibilityConfig);
            CommonUtilities.setText(this.view.lblCardStatusMobile, this.geti18nDrivenString(card.cardStatus), accessibilityConfig);
            this.view.lblCardStatusMobile.skin = this.statusSkinsDetailsScreen[card.cardStatus];
        },
        geti18nDrivenString: function(cardStatus) {
            if (cardStatus === OLBConstants.CARD_STATUS.Active) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.Inactive) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.inactive");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.Cancelled) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.cancelled");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.ReportedLost) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.ReplaceRequestSent) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.replaceRequestSent");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.CancelRequestSent) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.cancelRequestSent");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.Locked) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.locked");
            }
            if (cardStatus === OLBConstants.CARD_STATUS.Replaced) {
                return kony.i18n.getLocalizedString("i18n.CardManagement.replaced");
            }
            return "";
        },
        getImageForCard: function(cardProductName) {
            if (cardProductName) return this.cardImages[cardProductName];
            return ViewConstants.IMAGES.GOLDEN_CARDS;
        },
        getData: function() {
            return this.inputJsonData;
        },
        onBreakpointChange: function() {
            if (responsiveUtils.isMobile) {
                this.view.height = "90dp";
                this.view.lblCardName.setVisibility(false);
                this.view.lblCardStatus.setVisibility(false);
                this.view.imgCard.setVisibility(false);
                this.view.flxCardDetails.setVisibility(false);
                this.view.flxCardHeader.setVisibility(true);
            } else {
                this.view.height = "200dp";
                this.view.lblCardName.setVisibility(true);
                this.view.lblCardStatus.setVisibility(true);
                this.view.imgCard.setVisibility(true);
                this.view.flxCardDetails.setVisibility(true);
                this.view.flxCardHeader.setVisibility(false);
            }
        }
    };
});