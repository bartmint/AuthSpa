import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from 'src/app/admin-panel/admin-panel.component';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from 'src/app/_guards/auth-guard.guard';
import { RegisterComponent } from './register/register.component';
import { SuccesfullRegisterComponent } from './succesfull-register/succesfull-register.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        //canActivate: [AuthGuard], narazie powoduje ze admin sie nie wyswietla
        children: [
            {path: 'admin', component: AdminPanelComponent, canActivate:[AuthGuard]},
        ]
        
    },
     {path: 'register', component: RegisterComponent},
     {path: 'succesfull-register', component: SuccesfullRegisterComponent}
    // {path: 'errors', component: TestErrorsComponent},
    // {path: 'not-found', component: NotFoundComponent},
    // {path: 'server-error', component: ServerErrorComponent},
    // {path: '**', component: NotFoundComponent, pathMatch: 'full'} // kiedy nie znajdzie zadnej drogi

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}