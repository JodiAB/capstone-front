<template>
	<div>
		<h2>Register</h2>
		<form action="/register" method="POST">
			<label for="name">Name:</label><br>
			<input type="text" id="name" name="name" required><br><br>
			<label for="email">Email:</label><br>
			<input type="email" id="email" name="email" required><br><br>
			<label for="password">Password:</label><br>
			<input type="password" id="password" name="password" required><br><br>
			<button type="submit">Register</button>
		</form>
	</div>
</template>
<script>
export default {
	
}
</script>
<style>
	
</style>