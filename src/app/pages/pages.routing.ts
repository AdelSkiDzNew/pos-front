import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/auth-guard/AuthGuard';
import { CategorieResolver } from '../shared/services/resolver/categorie.resolver';
import { CommandeEnLigneComponent } from './preparation-commande/post-commande.component';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'commande-en-ligne', component: CommandeEnLigneComponent},
            { path: 'index', loadChildren: './index/index.module#IndexModule' },
            { path: 'nouvelle-commande',
              canActivate: [AuthGuard],
              loadChildren: './commande/commande.module#CommandeModule',
              resolve: { listeCategories : CategorieResolver } 
            },
            { path: 'produit',
              loadChildren: './produit/produit.module#ProduitModule',
              canActivate: [AuthGuard]
            },
            { path: 'profile-user', loadChildren: './profile-user/profile-user.module#ProfileUserModule' },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'ui', loadChildren: './ui/ui.module#UIModule' },
            { path: 'table', loadChildren: './table/table.module#TableModule' },
            { path: 'menu-levels', loadChildren: './menu-levels/menu-levels.module#MenuLevelsModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
