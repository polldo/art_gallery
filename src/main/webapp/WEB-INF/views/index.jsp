<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Art Gallery</title>
    <link rel="stylesheet" href="<c:url value='/webjars/bootstrap/3.3.7-1/css/bootstrap.css' />">
    <link rel="stylesheet" href="<c:url value='/webjars/fontawesome/4.7.0/css/font-awesome.css' />">
    <link rel="stylesheet" href="<c:url value='/static/css/images.css' />">
    <link rel="stylesheet" href="<c:url value='/static/css/profile.css' />">
    <link rel="stylesheet" href="<c:url value='/static/css/footer.css' />">
    <link rel="stylesheet" href="<c:url value='/static/css/info.css' />">
</head>

<body ng-app="artGallery" ng-controller="AppCtrl" class="ng-cloak">

<div class="header">
    <div class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#/"><i class="fa fa-object-ungroup"></i> ArtGallery</a>
            </div>

            <div class="collapse navbar-collapse" id="js-navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a ng-href="#!/author"><i class="fa fa-users" aria-hidden="true"></i> Authors</a></li>
                    <li><a ng-href="#!/author-admin" ng-if="isAuth"><i class="fa fa-wrench" aria-hidden="true"></i> Authors(Administration)</a></li>
                    <li><a ng-href="#!/painting"><i class="fa fa-picture-o" aria-hidden="true"></i> Paintings</a></li>
                    <li><a ng-href="#!/painting-admin" ng-if="isAuth"><i class="fa fa-wrench" aria-hidden="true"></i> Paintings(Administration)</a></li>
                    <li><a ng-href="#!/room"><i class="fa fa-th-large" aria-hidden="true"></i> Rooms</a></li>
                    <li><a ng-href="#!/info"><i class="fa fa-info" aria-hidden="true"></i> Info</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="" ng-click="login()" ng-if="!isAuth"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</a></li>
                    <li><a href="" ng-click="logout()" ng-if="isAuth"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div ng-view=""></div>
</div>

<footer class="footer">
	<div align="center">
    	©2017 Artgallery - Paolo Calao | Marco Tais
    </div>
</footer>

<!-- Vendors dependencies -->
<script src="<c:url value='/webjars/angularjs/1.6.4/angular.js' />"></script>
<script src="<c:url value='/webjars/angular-route/1.6.4/angular-route.js' />"></script>
<script src="<c:url value='/webjars/angular-animate/1.6.4/angular-animate.js' />"></script>
<script src="<c:url value='/webjars/angular-touch/1.6.4/angular-touch.js' />"></script>
<script src="<c:url value='/webjars/angular-aria/1.6.4/angular-aria.js' />"></script>
<script src="<c:url value='/webjars/jquery/1.11.1/jquery.js' />"></script>
<script src="<c:url value='/webjars/bootstrap/3.3.7-1/js/bootstrap.js' />"></script>
<script src="<c:url value='/webjars/angular-bootstrap/2.5.0/ui-bootstrap-tpls.js' />"></script>
<!-- Created dependencies -->
<script src="<c:url value='/static/js/app.js' />"></script>
    <!-- Controller -->
<script src="<c:url value='/static/js/controller/app.js' />"></script>
<script src="<c:url value='/static/js/controller/home.js' />"></script>
<script src="<c:url value='/static/js/controller/author.js' />"></script>
<script src="<c:url value='/static/js/controller/author-admin.js' />"></script>
<script src="<c:url value='/static/js/controller/author-profile.js' />"></script>
<script src="<c:url value='/static/js/controller/painting.js' />"></script>
<script src="<c:url value='/static/js/controller/painting-admin.js' />"></script>
<script src="<c:url value='/static/js/controller/picture.js' />"></script>
<script src="<c:url value='/static/js/controller/room.js' />"></script>
<script src="<c:url value='/static/js/controller/alert.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/login.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/add-author.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/delete-author.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/open-picture.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/modify-painting.js' />"></script>
<script src="<c:url value='/static/js/controller/modal/delete-painting.js' />"></script>
<script src="<c:url value='/static/js/controller/carousel.js' />"></script>
    <!-- Service -->
<script src="<c:url value='/static/js/service/auth.js' />"></script>
<script src="<c:url value='/static/js/service/tokenInterceptor.js' />"></script>
<script src="<c:url value='/static/js/service/author.js' />"></script>
<script src="<c:url value='/static/js/service/painting.js' />"></script>
<script src="<c:url value='/static/js/service/message.js' />"></script>
<script src="<c:url value='/static/js/service/room.js' />"></script>
</body>
</html>