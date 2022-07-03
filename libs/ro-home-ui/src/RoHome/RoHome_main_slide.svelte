<script lang="ts">
import { SwiperSlide } from '@menus/swiper'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_home_ui_Ctx } from '../ro_home_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_home_ui_Ctx
export let tag_heading:string
</script>

<SwiperSlide class="RoHome_main_slide {$$props.class || ''}">
	<div class="main-text">
		<div class="tag-heading">{ tag_heading }</div>
	</div>
	<div class="image-overlay"></div>
</SwiperSlide>
