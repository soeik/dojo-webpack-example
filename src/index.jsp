<%@ taglib uri="jstl-core" prefix="c" %>
<%@ taglib uri="jstl-functions" prefix="fn" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Dojo Webpack example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        var dojoConfig = { locale: 'en' }
    </script>
</head>

<body>
    <div id="app"></div>
    <!--
        Example how to pass dojoConfig parameters
        <script type="text/javascript">var dojoConfig = { locale: '<c:out value=""/>' };</script>
    -->
    <script type="text/javascript" src="main.js"></script>
</body>

</html>