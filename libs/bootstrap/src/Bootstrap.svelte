<style type="text/scss" global>
@import "@menus/css/lib";
@import "@menus/bootstrap/src/bootstrap";
$btn-xss-height: 24px;
$btn-xs-height: 32px;
$btn-sm-height: 32px;
$btn-md-height: 32px;
$btn-lg-height: 40px;
$btn-xlg-height: 48px;
.btn {
	display: inline-block;
	align-items: center;
	justify-content: center;
	flex-grow: 0;
	min-width: 152px;
	height: $input-height-large;
	padding: 0;
	border-width: 2px;
	font-size: 16px;
	font-weight: $lato-bold;
	background-size: 24px 24px;
	box-shadow: none !important;
	&.xs-shrink {
		@media (max-width: $screen-xs-max) {
			min-width: 100px;
		}
	}
	&.btn-xxs {
		min-width: 96px;
		height: $btn-xss-height;
		padding: 0;
		line-height: $btn-xss-height - 4px;
		font-size: 12px;
	}
	&.btn-xs {
		min-width: 100px;
		height: $btn-xs-height;
		padding: 0;
		line-height: $btn-xs-height - 4px;
	}
	&.btn-sm {
		min-width: 144px;
		height: $btn-sm-height;
		padding: 0;
		line-height: $btn-sm-height - 4px;
		&.xs-shrink {
			@media (max-width: $screen-xs-max) {
				min-width: 100px;
			}
		}
	}
	&.btn-md {
		min-width: 160px;
		height: $btn-md-height;
		padding: 0;
		line-height: $btn-md-height - 4px;
		&.xs-shrink {
			@media (max-width: $screen-xs-max) {
				min-width: 100px;
			}
		}
	}
	&.btn-lg {
		min-width: 160px;
		height: $btn-lg-height;
		padding: 0;
		line-height: $btn-lg-height - 4px;
		&.xs-shrink {
			@media (max-width: $screen-xs-max) {
				min-width: 100px;
			}
		}
	}
	&.btn-xlg {
		min-width: 160px;
		height: $btn-xlg-height;
		padding: 0;
		line-height: $btn-xlg-height - 4px;
		&.xs-shrink {
			@media (max-width: $screen-xs-max) {
				min-width: 100px;
			}
		}
	}
	&.btn-fb {
		$fb-color: #4460A0;
		color: white;
		background-color: $fb-color;
		&:hover {
			&:not(.btn-no-hover) {
				color: white;
				background-color: $fb-color;
				border-color: $fb-color;
			}
		}
	}
	&.btn-gplus {
		$gplus-color: #4285F4;
		color: white;
		background-color: $gplus-color;
		&:hover {
			&:not(.btn-no-hover) {
				color: white;
				background-color: $gplus-color;
				border-color: $gplus-color;
			}
		}
	}
	&.btn-inverse {
		&.btn-primary {
			color: $brand-primary;
			background-color: white;
			&:hover, &.active {
				&:not(.btn-no-hover) {
					color: white;
					background-color: $brand-primary;
					border-color: $brand-primary;
				}
			}
		}
		&.btn-success {
			color: $brand-success;
			background-color: white;
			&:hover, &.active {
				&:not(.btn-no-hover) {
					color: white;
					background-color: $brand-success;
					border-color: $brand-success;
				}
			}
		}
		&.btn-danger {
			color: $brand-danger;
			background-color: white;
			&:hover, &.active {
				&:not(.btn-no-hover) {
					color: white;
					background-color: $brand-danger;
					border-color: $brand-danger;
				}
			}
		}
		&.ladda-button {
			transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0s, color 0s !important;
		}
	}
}
.btn-xxs-height {
	height: $btn-xss-height;
	line-height: $btn-xss-height;
}
.btn-xs-height {
	height: $btn-xs-height;
	line-height: $btn-xs-height;
}
.btn-sm-height {
	height: $btn-sm-height;
	line-height: $btn-sm-height;
}
.btn-md-height {
	height: $btn-md-height;
	line-height: $btn-md-height;
}
.btn-lg-height {
	height: $btn-lg-height;
	line-height: $btn-lg-height;
}
.btn-xlg-height {
	height: $btn-xlg-height;
	line-height: $btn-xlg-height;
}
.action-buttons {
	text-align: left;
	@media (max-width: $screen-xs-max) {
		display: flex;
		align-items: flex-end;
		flex-direction: row;
	}
	.btn {
		@media (max-width: $screen-xs-max) {
			display: inline-flex;
			flex: 1;
			text-align: center;
			margin: 0;
		}
	}
}
</style>
