<template>
	<section id="experience">
		<h2>{{ $t('events.title') }}</h2>
		<span class="emoji-title emoji--rock-girl"/>
		<ul class="experience__content">
			<Experience
				v-for="item in events"
				:key="item.name"
				:item="item"
				:type="'events'"
			/>
		</ul>
		<h2>{{ $t('workExperience.title') }}</h2>
		<span class="emoji-title emoji--girl-coding"/>
		<ul class="experience__content">
			<Experience
				v-for="item in workExperience"
				:key="item.name"
				:item="item"
				:type="'workExperience'"
			/>
		</ul>
		<h2>{{ $t('education.title') }}</h2>
		<span class="emoji-title emoji--nerd"/>
		<ul class="experience__content">
			<Experience
				v-for="item in education"
				:key="item.name"
				:item="item"
				:type="'education'"
			/>
		</ul>
	</section>
</template>
<script>
import Experience from "~/components/Experience.vue";

export default {
	components: { Experience },

	data () {
		return {
			workExperience: [
				{
					id: 'holaluz',
					name: 'Holaluz',
					isActive: true
				},
				{
					id: 'thedream',
					name: 'The Dream VR'
				},
				{
					id: 'marsbased',
					name: 'MarsBased'
				},
				{
					id: 'midealab',
					name: 'Midealab'
				},
				{
					id: 'microsoft',
					name: 'Microsoft'
				},
				{
					id: 'fastmonkeys',
					name: 'FastMonkeys'
				}
			],
			education: [
				{
					id: 'selfLearning',
					noStartingTime: true,
					isActive: true,
					noURL: true
				},
				{
					id: 'hkust'
				},
				{
					id: 'metropolia'
				}
			],
			events: [
				{
					id: 'designbeyondtechnolgy',
					imgType: 'jpg'
				},
				{
					id: 't3chfest',
					imgType: 'jpg',
					video: 'https://www.youtube.com/watch?v=-mlfB-GlMt4'
				},
				{
					id: 'wwcmiddleman',
					imgType: 'jpg'
				}
			]
		}
	}
};
</script>
