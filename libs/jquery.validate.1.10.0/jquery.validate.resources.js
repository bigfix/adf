jQuery.extend(jQuery.validator.messages, {
    required: temui.l10n.validate.required,
    remote: temui.l10n.validate.remote,
    email: temui.l10n.validate.email,
    url: temui.l10n.validate.url,
    date: temui.l10n.validate.date,
    dateISO: temui.l10n.validate.dateISO,
    number: temui.l10n.validate.number,
    digits: temui.l10n.validate.digits,
    creditcard: temui.l10n.validate.creditcard,
    equalTo: temui.l10n.validate.equalTo,
    maxlength: $.validator.format(temui.l10n.validate.maxlength),
    minlength: $.validator.format(temui.l10n.validate.minlength),
    rangelength: $.validator.format(temui.l10n.validate.rangelength),
    range: $.validator.format(temui.l10n.validate.range),
    max: $.validator.format(temui.l10n.validate.max),
    min: $.validator.format(temui.l10n.validate.min)
});