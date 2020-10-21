# Deforming a Circle


1. We procedurally generate the geometry for the circle using a triangle fan.  
2. Explicitly editing the vertex buffer (gl.DYANMIC_DRAW), we add offsets based on a sin curve to the boundary points.   
3. We animate the scene by incrementing the angle in the sin function once per frame. 


